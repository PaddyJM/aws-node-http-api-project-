import { PrismaClient } from "@prisma/client";

const create = async(prisma: PrismaClient, data: any) => {
  console.log(data);
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      posts: {
        create: { title: data.posts.create.title },
      },
      profile: {
        create: { bio: data.profile.create.bio },
      },
    },
  });
}

export default create;
