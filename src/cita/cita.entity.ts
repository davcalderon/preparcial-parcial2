import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/entities/users.entity';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false })
  id_user!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user!: User;

  @Column({ type: 'uuid' })
  id_doctor!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_doctor' })
  doctor!: User;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'cancelled', 'done'],
    default: 'pending',
  })
  status!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
