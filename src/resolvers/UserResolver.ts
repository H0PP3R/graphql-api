import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType,
  Ctx,
} from 'type-graphql';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { dataSource } from '../datasource';
import argon2 from 'argon2';

class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

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

  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: number,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('address') address: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.address = address;
    await this.userRepository.save(user);
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id') id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    await this.userRepository.remove(user);
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: any,
  ): Promise<UserResponse> {
    //email validation
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regexp.test(options.email) === false) {
      return {
        errors: [
          {
            field: 'email',
            message: 'length must be greater than 2',
          },
        ],
      };
    }
    //password validation
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password must be greater than 2',
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user: User | undefined = undefined;
    try {
      user = await User.create({
        email: options.email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      if (err.errno === 19) {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }
    //store user id session, auto-logs in after registration
    req.session.userId = user?.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: any,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: options.email } });
    if (!user) {
      return {
        errors: [{ field: 'email', message: "email doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: "that password doesn't exist",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }
}
