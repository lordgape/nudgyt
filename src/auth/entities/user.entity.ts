import { classToPlain, Exclude } from 'class-transformer';
import { ObjectIdColumn, Column, CreateDateColumn, Entity } from 'typeorm';

/* istanbul ignore file */
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
    const ObjectId = this.id;

    return {
      id: ObjectId,
      ...classToPlain(this),
    };
  }
}
