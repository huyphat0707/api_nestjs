import { Category } from './../../category/entities/category.entity';
import { IsOptional } from 'class-validator';
import { Role } from 'enums/role.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsOptional()
  title: string;

  @Column()
  @IsOptional()
  description: string;

  @Column()
  @IsOptional()
  thumbnail: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;
}
