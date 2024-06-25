"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const transactionResolver = {
    Query: {
        transactions: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.getUser())
                    throw new Error("Unauthorized User");
                const userId = yield context.getUser()._id;
                const transactions = yield transaction_model_1.default.find({ userId });
                return transactions;
            }
            catch (error) {
                console.error("Error getting transactions");
                throw new Error("Error getting transactions");
            }
        }),
        transaction: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { transactionId }, context) {
            try {
                const transaction = yield transaction_model_1.default.findById(transactionId);
                return transaction;
            }
            catch (error) {
                console.log("Error getting transaction");
                throw new Error("Error getting transaction");
            }
        }),
        // TODO: Add categoryStatistics query
    },
    Mutation: {
        createTransaction: (parent_1, _a, context_1) => __awaiter(void 0, [parent_1, _a, context_1], void 0, function* (parent, { input }, context) {
            try {
                const newTransaction = new transaction_model_1.default(Object.assign(Object.assign({}, input), { userId: context.getUser()._id }));
                yield newTransaction.save();
                return newTransaction;
            }
            catch (error) {
                console.log("Error creating transaction");
                throw new Error("Error creating transaction");
            }
        }),
        updateTransaction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            try {
                const updatedTransaction = yield transaction_model_1.default.findByIdAndUpdate(input.transactionId, input, { new: true });
                return updatedTransaction;
            }
            catch (error) {
                console.error("Error updating transaction");
                throw new Error("Error updating transaction");
            }
        }),
        deleteTransaction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { transactionId }) {
            try {
                const deletedTransaction = yield transaction_model_1.default.findByIdAndDelete(transactionId);
                return deletedTransaction;
            }
            catch (error) {
                console.error("Error deleting transaction");
                throw new Error("Error deleting transaction");
            }
        }),
    },
    // TODO: Add user/transaction relation
};
exports.default = transactionResolver;
