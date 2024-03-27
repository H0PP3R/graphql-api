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

  @Query(() => User)
  getLibraryCard(@Arg('id') id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  @Mutation(() => User)
  async createUser(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('address') address: string,
  ): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.address = address;
    await dataSource.getRepository(User).save(user);
    return user;
  }
}
