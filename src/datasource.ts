import * as TypeORM from 'typeorm';
import { ActivityLog, Book, Customer, LibraryCard, Staff, User } from './entity';

export const dataSource = new TypeORM.DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 26257,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  dropSchema: true,
  cache: true,
  logging: 'all',
  entities: [User, LibraryCard, Book, ActivityLog, Customer, Staff],
  logger: 'advanced-console',
});
