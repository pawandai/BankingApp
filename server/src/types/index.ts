import { mergeTypeDefs } from "@graphql-tools/merge";
import userType from "./user.type";
import transactionType from "./transaction.type";
import { Request, Response } from "express";

const mergedTypes = mergeTypeDefs([userType, transactionType]);

export type TransactionType = {
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: string;
};

export type SignUpUserType = {
  username: string;
  name: string;
  password: string;
  gender: string;
};

export type LogInInputType = {
  username: string;
  password: string;
};

export type ContextType = { req: Request; res: Response };

export default mergedTypes;
