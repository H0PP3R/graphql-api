import { dataSource } from './datasource';
import { ActivityLog, Book, Customer, LibraryCard, User } from './entity';

export async function seedDatabase() {
  const customerRepository = dataSource.getRepository(Customer);
  const libraryCardRepository = dataSource.getRepository(LibraryCard);
  const bookRepository = dataSource.getRepository(Book);
  const activityLogRepository = dataSource.getRepository(ActivityLog);

  const [activityLog1, activityLog2] = activityLogRepository.create([
    {
      action: 'check-out',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userName: 'John Doe',
    },
    {
      action: 'check-in',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userName: 'John Doe',
    },
  ]);
  await activityLogRepository.save([activityLog1, activityLog2]);

  const [book1, book2, book3] = bookRepository.create([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
    },
    {
      title: '1984',
      author: 'George Orwell',
    },
  ]);
  await bookRepository.save([book1, book2, book3]);

  const [libraryCard1, libraryCard2] = libraryCardRepository.create([
    {
      books: [book1, book2, book3],
    },
    {
      books: [book1],
    },
  ]);
  await libraryCardRepository.save([libraryCard1, libraryCard2]);

  const defaultCustomer = customerRepository.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe@email.com',
    password: 'password',
    address: '1234 Elm St',
    registrationDate: new Date(),
    birthDate: new Date(),
    libraryCard: [libraryCard1, libraryCard2],
  });
  await customerRepository.save(defaultCustomer);

  return { defaultCustomer };
}
