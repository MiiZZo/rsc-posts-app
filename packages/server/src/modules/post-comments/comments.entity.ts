import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@modules/users';
import { BaseEntity } from '@shared/typeorm';
import { UserPost } from '@modules/posts';
@Entity()
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

  @ManyToOne('UserPost', (post: UserPost) => post.comments)
  post: UserPost;
}
