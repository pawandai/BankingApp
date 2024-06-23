"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../dummyData/data");
const userResolver = {
    Query: {
        users: () => {
            return data_1.users;
        },
        user: (_, { userId }) => {
            return data_1.users.find((user) => user._id === userId);
        },
    },
    Mutation: {},
};
exports.default = userResolver;
