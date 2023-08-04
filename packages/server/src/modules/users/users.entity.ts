import { UserPost } from '@modules/posts';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @OneToMany('UserPost', (post: UserPost) => post.user)
  posts: UserPost[]
}
