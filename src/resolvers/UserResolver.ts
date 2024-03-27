import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { dataSource } from '../datasource';

@Resolver(User)
export class UserResolver {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }
  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation(() => User)
  async createUser(@Arg('name') name: string, @Arg('email') email: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    await dataSource.getRepository(User).save(user);
    return user;
  }
}
