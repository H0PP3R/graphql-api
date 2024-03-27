import { dataSource } from './datasource';
import { User } from './entity';

export async function seedDatabase() {
  const userRepository = dataSource.getRepository(User);

  const defaultUser = userRepository.create({
    name: 'John Doe',
    email: 'JohnDoe@email.com',
  });
  await userRepository.save(defaultUser);

  return { defaultUser };
}
