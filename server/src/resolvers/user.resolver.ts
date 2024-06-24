import { Request, Response } from "express";
import { users } from "../dummyData/data";

const userResolver = {
  Query: {
    users: (
      parent: any,
      args: any,
      { req, res }: { req: Request; res: Response }
    ) => {
      return users;
    },
    user: (_: any, { userId }: { userId: string }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
