import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUpdate {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
