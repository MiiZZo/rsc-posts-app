import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserPost } from '@modules/posts';
import { PostComment } from '@modules/post-comments';
import { BaseEntity } from '@shared/typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    select: false
  })
  password: string;

  @OneToMany('UserPost', (post: UserPost) => post.user)
  posts: UserPost[];

  @OneToMany('PostComment', (comment: PostComment) => comment.user)
  comments: PostComment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
