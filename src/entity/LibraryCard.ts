import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Customer } from './Customer';
import { Book } from './Book';

@ObjectType()
@Entity()
export class LibraryCard extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.libraryCard)
  customer?: Customer;

  @Field(() => [Book])
  @Column({ type: 'json' })
  @OneToMany(() => Book, (book) => book.libraryCard)
  books!: Book[];
}
