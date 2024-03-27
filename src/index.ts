import 'reflect-metadata';
import 'dotenv/config';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { dataSource } from './datasource';
import { seedDatabase } from './helper';
import path from 'path';
import { Context } from './context.type';
import { ApolloServer } from '@apollo/server';

async function bootstrap() {
  await dataSource.initialize();
  const { defaultUser } = await seedDatabase();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema/schema.graphql'),
  });

  const context: Context = {
    user: defaultUser,
  };

  const server = new ApolloServer<Context>({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => context,
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap().catch(console.error);
