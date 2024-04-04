import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Repository } from 'typeorm';
import { dataSource } from '../datasource';
import { ActivityLog } from '../entity';

@Resolver(ActivityLog)
export class ActivityLogResolver {
  private readonly bookRepository: Repository<ActivityLog>;

  constructor() {
    this.bookRepository = dataSource.getRepository(ActivityLog);
  }

  @Query(() => [ActivityLog])
  getAllActivityLogs(): Promise<ActivityLog[]> {
    return this.bookRepository.find();
  }

  @Query(() => ActivityLog)
  getActivityLog(@Arg('id') id: number): Promise<ActivityLog | undefined> {
    return this.bookRepository.findOneBy({ id: id });
  }

  @Query(() => [ActivityLog])
  getActivityLogsByUserName(@Arg('userName') userName: string): Promise<ActivityLog[]> {
    return this.bookRepository.find({ where: { userName: userName } });
  }

  @Query(() => [ActivityLog])
  getActivityLogsByAction(@Arg('action') action: string): Promise<ActivityLog[]> {
    return this.bookRepository.find({ where: { action: action } });
  }

  @Query(() => [ActivityLog])
  getActivityLogsByUserNameAndAction(
    @Arg('userName') userName: string,
    @Arg('action') action: string,
  ): Promise<ActivityLog[]> {
    return this.bookRepository.find({ where: { userName: userName, action: action } });
  }

  @Mutation(() => ActivityLog)
  async createActivityLog(): Promise<ActivityLog> {
    const book = new ActivityLog();
    await dataSource.getRepository(ActivityLog).save(book);
    return book;
  }
}
