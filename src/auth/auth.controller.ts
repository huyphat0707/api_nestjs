import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login(loginUserDto);
  }

  @Post('auth/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.register(registerUserDto);
  }

  @Post('auth/refresh-token')
  async refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }
}
