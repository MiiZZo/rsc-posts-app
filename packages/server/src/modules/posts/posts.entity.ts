import { User } from '@modules/users'
import { BaseEntity } from '@shared/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne('User', (user: User) => user.posts)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: string;
}
