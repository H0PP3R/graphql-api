import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  email!: string;
}
