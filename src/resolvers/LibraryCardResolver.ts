import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { dataSource } from '../datasource';
import { LibraryCard } from '../entity';

@Resolver(LibraryCard)
export class LibraryCardResolver {
  private readonly libraryCardRepository: Repository<LibraryCard>;

  constructor() {
    this.libraryCardRepository = dataSource.getRepository(LibraryCard);
  }

  @Query(() => [LibraryCard])
  getAllLibraryCards(): Promise<LibraryCard[]> {
    return this.libraryCardRepository.find();
  }

  @Query(() => LibraryCard)
  getLibraryCard(@Arg('id') id: number): Promise<LibraryCard | undefined> {
    return this.libraryCardRepository.findOneBy({ id: id });
  }

  @Mutation(() => User)
  async createLibraryCard(): Promise<LibraryCard> {
    const card = new LibraryCard();
    await dataSource.getRepository(LibraryCard).save(card);
    return card;
  }
}
