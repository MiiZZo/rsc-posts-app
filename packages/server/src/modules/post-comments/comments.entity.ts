import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@modules/users';
import { BaseEntity } from '@shared/typeorm';
import { UserPost } from '@modules/posts';

export class PostComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;
  
  @ManyToOne('User', (user: User) => user.comments)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne('Post', (post: UserPost) => post.comments)
  post: UserPost;
}
