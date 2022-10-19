import { PrismaClient } from "@prisma/client";
import createUser from "./user/create";
import findManyUsers from "./user/findMany";

const prisma = new PrismaClient();

async function main(request: any) {
  if (request.endpoint === "users" && request.method === "POST") {
    createUser(prisma, request.body);
  }

  let allUsers;
  if (request.endpoint === "users" && request.method === "GET") {
    allUsers = await findManyUsers(prisma);
  }

  console.dir(allUsers, { depth: null });
}

const postRequest = {
  method: "POST",
  endpoint: "users",
  body: {
    name: "Nobody",
    email: "anon@nowhere.com",
    posts: {
      create: {
        title: "How to get nowhere"
      }
    },
    profile: {
      create: {
        bio: "Nothing to say."
      }
    }
  }
}

main(postRequest)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const getRequest = {
  endpoint: "users",
  method: "GET"
}

main(getRequest)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
