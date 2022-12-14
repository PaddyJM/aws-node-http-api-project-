import client from "../../lib/client";

interface User {
  name: string,
  email: string,
  posts: {
    create: {
      title: string
    }
  },
  profile: {
    create: {
      bio: string
    }
  }
}

const create = async(data: User) => {
  await client.user.create({
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
