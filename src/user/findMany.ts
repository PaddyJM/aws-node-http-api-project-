import { PrismaClient } from "@prisma/client";

const findMany = async (prisma: PrismaClient) => {
  return await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
};

export default findMany;
