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

  @Mutation(() => ActivityLog)
  async createActivityLog(): Promise<ActivityLog> {
    const book = new ActivityLog();
    await dataSource.getRepository(ActivityLog).save(book);
    return book;
  }
}
