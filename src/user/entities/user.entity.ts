import { Role } from 'enums/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.User })
  roles: Role;

  @Column({ default: true })
  isVerified: boolean;

  @Column({ default: true })
  isEnabled: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ default: 0 })
  failedLoginAttempts: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  refresh_token: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
