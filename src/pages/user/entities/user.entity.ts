import { Role } from '../../../enums/role.enum';
import { Post } from './../../post/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: Role.User })
  roles: Role;

  @Column({ default: true })
  is_verified: boolean;

  @Column({ default: true })
  is_enabled: boolean;

  @Column({ default: false })
  is_locked: boolean;

  @Column({ default: 0 })
  failed_login_attempts: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  refresh_token: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @CreateDateColumn({ nullable: true })
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
