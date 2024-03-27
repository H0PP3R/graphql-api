import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ActivityLog {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: string;

  @Field(() => String)
  @Column()
  userName!: string;

  @Field(() => String)
  @Column()
  action!: string;
}
