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

  @Query(() => [LibraryCard])
  async getLibraryCardsByUserId(@Arg('userId') userId: number): Promise<LibraryCard[]> {
    const libraryCards = await this.libraryCardRepository
      .createQueryBuilder("libraryCard")
      .innerJoinAndSelect("libraryCard.user", "user", "user.id = :userId", { userId })
      .getMany();

    return libraryCards;
}

  @Mutation(() => User)
  async createLibraryCard(): Promise<LibraryCard> {
    const card = new LibraryCard();
    await dataSource.getRepository(LibraryCard).save(card);
    return card;
  }

  @Mutation(() => LibraryCard)
  async updateLibraryCard(@Arg('id') id: number): Promise<LibraryCard> {
    const card = await this.libraryCardRepository.findOneBy({ id: id });
    await this.libraryCardRepository.save(card);
    return card;
  }

  @Mutation(() => LibraryCard)
  async deleteLibraryCard(@Arg('id') id: number): Promise<LibraryCard> {
    const card = await this.libraryCardRepository.findOneBy({ id: id });
    await this.libraryCardRepository.remove(card);
    return card;
  }
}
