import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Staff extends User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;
}
