import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/entities/users.entity';

export enum CitaStatus {
  pending = 'pending',
  cancelled = 'cancelled',
  done = 'done',
}

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false })
  id_user!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user!: User;

  @Column({ type: 'uuid', nullable: false })
  id_doctor!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_doctor' })
  doctor!: User;

  @Column({ type: 'timestamp', nullable: false })
  datetime!: Date;

  @Column({ type: 'text', nullable: false })
  reason!: string;

  @Column({
    type: 'enum',
    enum: CitaStatus,
    default: CitaStatus.pending,
  })
  status!: CitaStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
