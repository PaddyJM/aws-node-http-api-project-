import client from "../lib/client";
import createUser from "./user/create";
import findManyUsers from "./user/findMany";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  posts: z.object({
    create: z.object({
      title: z.string(),
    }),
  }),
  profile: z.object({
    create: z.object({
      bio: z.string(),
    }),
  }),
});

export async function main(request: any) {
  if (request.endpoint === "users" && request.method === "POST") {
    userSchema.parse(request.body)
    createUser(request.body);
  }

  let allUsers;
  if (request.endpoint === "users" && request.method === "GET") {
    allUsers = await findManyUsers();
  }

  console.dir(allUsers, { depth: null });

  try {
    await client.$disconnect();
  } catch(e) {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  };
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
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });

const getRequest = {
  endpoint: "users",
  method: "GET"
}

main(getRequest)
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
