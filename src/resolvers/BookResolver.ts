import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Repository } from 'typeorm';
import { dataSource } from '../datasource';
import { Book } from '../entity';

@Resolver(Book)
export class BookResolver {
  private readonly bookRepository: Repository<Book>;

  constructor() {
    this.bookRepository = dataSource.getRepository(Book);
  }

  @Query(() => [Book])
  getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  @Query(() => Book)
  getBook(@Arg('id') id: number): Promise<Book | undefined> {
    return this.bookRepository.findOneBy({ id: id });
  }

  @Mutation(() => Book)
  async createBook(): Promise<Book> {
    const book = new Book();
    await dataSource.getRepository(Book).save(book);
    return book;
  }
}
