import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Repository } from 'typeorm';
import { dataSource } from '../datasource';
import { Book, LibraryCard } from '../entity';

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

  @Mutation(() => Book)
  async updateBook(@Arg('id') id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: id });
    await this.bookRepository.save(book);
    return book;
  }

  @Mutation(() => Book)
  async deleteBook(@Arg('id') id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: id });
    await this.bookRepository.remove(book);
    return book;
  }

  @Mutation(() => Book)
  async borrowBook(@Arg('id') id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: id });
    book.borrowed = true;
    await this.bookRepository.save(book);
    return book;
  }

  @Mutation(() => Book)
  async returnBook(@Arg('id') id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: id });
    book.borrowed = false;
    await this.bookRepository.save(book);
    return book;
  }

  @Mutation(() => Book)
  async assignBookToLibraryCard(
    @Arg('bookId') bookId: number,
    @Arg('libraryCardId') libraryCardId: number,
  ): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: bookId });
    const libraryCard = await dataSource.getRepository(LibraryCard).findOneBy({ id: libraryCardId });
    book.libraryCard = libraryCard;
    await this.bookRepository.save(book);
    return book;
  }

  @Mutation(() => Book)
  async unassignBookFromLibraryCard(@Arg('id') id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: id });
    book.libraryCard = null;
    await this.bookRepository.save(book);
    return book;
  }

  @Query(() => [Book])
  getBooksByLibraryCard(@Arg('libraryCardId') libraryCardId: number): Promise<Book[]> {
    return this.bookRepository.find({ where: { libraryCard: { id: libraryCardId } } });
  }
}
