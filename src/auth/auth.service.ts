import { RegisterUserDto } from './dto/register.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const hashPassword = await this.hashPassword(registerUserDto.password);

    const user = await this.userRepository.save({
      ...registerUserDto,
      refresh_token: 'token',
      password: hashPassword,
    });
    const payload = { id: user.id, email: user.email, roles: user.roles };

    return this.generateToken(payload);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userRepository.findOneBy({
      email: loginUserDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, email: user.email, roles: user.roles };

    return this.generateToken(payload);
  }

  async refreshToken(refresh_token: string): Promise<any> {
    const verify = await this.jwtService.verifyAsync(refresh_token, {
      secret: this.configService.get<string>('SECRET'),
    });
    if (!verify) {
      throw new UnauthorizedException('Token expired');
    }

    const user = await this.userRepository.findOneBy({
      email: verify?.email,
      refresh_token,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { id: user.id, email: user.email, roles: user.roles };

    return this.generateToken(payload);
  }

  hashPassword = async (password: string): Promise<string> => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  };

  generateToken = async (payload: {
    id: number;
    email: string;
    roles: string;
  }): Promise<{ access_token: string; refresh_token: string }> => {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXPIRES_IN'),
    });
    await this.userRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );

    return { access_token, refresh_token };
  };
}
