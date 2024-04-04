import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LibraryCard } from './LibraryCard';
import { User } from './User';
import { UserRole } from './UserRole';

@ObjectType()
@Entity()
export class Customer extends User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => [LibraryCard])
  @Column({ type: 'json' })
  @OneToMany(() => LibraryCard, (libraryCard) => libraryCard.customer)
  libraryCard?: LibraryCard[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
}
