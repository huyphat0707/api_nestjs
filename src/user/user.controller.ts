import { UserService } from 'src/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from 'enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller('api/users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = req.user;
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userService.findOneById(user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'items_per_page' })
  @ApiQuery({ name: 'search' })
  async findAll(@Query() query: FilterUserDto): Promise<User[]> {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async findOneById(@Param('id') id: number): Promise<User | undefined> {
    return await this.userService.findOneById(id);
  }

  @UseGuards(RolesGuard)
  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: User,
  ): Promise<User> {
    return await this.userService.update({ ...updateUserDto, id });
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.delete(id);
  }
}
