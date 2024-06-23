"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_type_1 = __importDefault(require("./user.type"));
const transaction_type_1 = __importDefault(require("./transaction.type"));
const mergedTypes = (0, merge_1.mergeTypeDefs)([user_type_1.default, transaction_type_1.default]);
exports.default = mergedTypes;
