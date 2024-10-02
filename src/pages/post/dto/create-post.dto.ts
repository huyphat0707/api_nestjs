import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Category } from 'src/pages/category/entities/category.entity';
import { User } from 'src/pages/user/entities/user.entity';

export class CreatePostDTO {
  @ApiProperty()
  title: string;
  user: User;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  categoryId: number;
  category: Category;

  @ApiProperty()
  description: string;

  @IsOptional()
  status: number;
}
