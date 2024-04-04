import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { UserRole } from './UserRole';

@ObjectType()
@Entity()
export class Staff extends User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role: UserRole
}
