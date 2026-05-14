/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  role_name!: string;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
