import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Link } from './link.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Link, (link: Link) => link.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  links?: Link[];
}
