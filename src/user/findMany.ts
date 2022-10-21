import client from "../../lib/client";

const findMany = async () => {
  return await client.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
};

export default findMany;
