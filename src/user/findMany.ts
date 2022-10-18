import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findMany = async () => {
  return await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
};

export default findMany;
