import * as fs from 'node:fs';
import * as path from 'node:path';

import { PrismaClient } from '@prisma/client';

async function setupDatabase() {
  const prismaClient = new PrismaClient();

  const rls = fs.readFileSync(path.resolve(__dirname, './sql/row-level-security.sql')).toString();
  const appUser = fs.readFileSync(path.resolve(__dirname, './sql/create-app-user.sql')).toString();

  try {
    const rlsQuery = rls.split(';').filter(query => query.trim() !== '');
    const appUserQuery = appUser.split(';').filter(query => query.trim() !== '');

    const queries = [...rlsQuery, ...appUserQuery];

    const promises = queries.map(query => prismaClient.$queryRawUnsafe(query));

    await prismaClient.$transaction(promises);

    console.log('Database setup completed successfully ✅');
  } catch (error) {
    console.error(error);

    console.log('Database setup failed ❌ - This could be due to the database already being setup');
  } finally {
    await prismaClient.$disconnect();
  }
}

setupDatabase();
