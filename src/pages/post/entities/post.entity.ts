import { Category } from './../../category/entities/category.entity';
import { IsOptional } from 'class-validator';
import { User } from 'src/pages/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @CreateDateColumn({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
