import { User } from '@modules/users'
import { CreateUpdate } from '@shared/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column(() => CreateUpdate)
  createUpdateDates: CreateUpdate;

  @ManyToOne('User', (user: User) => user.posts)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: string;
}
