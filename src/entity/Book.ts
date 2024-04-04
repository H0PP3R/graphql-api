import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { LibraryCard } from './LibraryCard';

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  author!: string;

  @Field(() => Boolean)
  @Column({ default: false }) 
  borrowed!: boolean;

  @Field(() => LibraryCard)
  @ManyToOne(() => LibraryCard, (card) => card.books)
  libraryCard!: LibraryCard;
}
