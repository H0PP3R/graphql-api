import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@ObjectType()
@Entity()
export class LibraryCard extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.libraryCard)
  user?: User;

  @Field(() => [Book])
  @Column({ type: 'json' })
  @OneToMany(() => Book, (book) => book.libraryCard)
  books!: Book[];
}
