import { PrismaClient } from "@prisma/client";
import createUser from "./user/create";
import findManyUsers from "./user/findMany";

const prisma = new PrismaClient();

async function main() {
  createUser();

  const allUsers = await findManyUsers();

  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
