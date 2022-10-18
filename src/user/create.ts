import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async() => {
  await prisma.user.create({
    data: {
      name: "Patrick",
      email: "PatrickJamesMorton@gmail.com",
      posts: {
        create: { title: "Goodbye World" },
      },
      profile: {
        create: { bio: "I like turnips" },
      },
    },
  });
}

export default create;
