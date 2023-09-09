import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostComment } from '@modules/post-comments';
import { User } from '@modules/users'
import { BaseEntity } from '@shared/typeorm';

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

  @OneToMany('PostComment', (comment: PostComment) => comment.post)
  comments: PostComment[];
}
