import { UserPost } from '@modules/posts';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
