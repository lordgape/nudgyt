import { classToPlain, Exclude, instanceToPlain } from 'class-transformer';
import {
  ObjectIdColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: false })
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  toJSON() {
    let ObjectId =  this.id;

   return {
     id:ObjectId,
     ...instanceToPlain(this)
     
   }
    
  }
}
