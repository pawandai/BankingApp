import { mergeTypeDefs } from "@graphql-tools/merge";
import userType from "./user.type";
import transactionType from "./transaction.type";

const mergedTypes = mergeTypeDefs([userType, transactionType]);

export default mergedTypes;
