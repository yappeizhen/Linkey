import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  originalUrl: string;

  @Column({ nullable: true, default: null })
  deletedAt: Date | null;

  @Index()
  @Column('int4')
  userId: number;
  @ManyToOne(() => User, (user: User) => user.links, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  user?: User;
}
