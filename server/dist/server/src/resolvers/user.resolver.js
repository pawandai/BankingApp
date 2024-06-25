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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const userResolver = {
    Query: {
        user: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const user = yield user_model_1.default.findById(userId);
                return user;
            }
            catch (error) {
                console.log("Error in user query:", error);
                throw new Error("Error while getting user");
            }
        }),
        authUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield context.getUser();
                return user;
            }
            catch (error) {
                console.log("Error in authUser:", error);
                throw new Error("Internal server error");
            }
        }),
        // TODO: Add user/transaction relation
    },
    Mutation: {
        signUp: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            try {
                const { username, name, password, gender } = input;
                if (!username || !name || !password || !gender) {
                    throw new Error("Please provide all fields");
                }
                const existingUser = yield user_model_1.default.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const salt = bcryptjs_1.default.getSalt("10");
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;
                const newUser = new user_model_1.default({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? maleProfilePicture : femaleProfilePicture,
                });
                yield newUser.save();
                yield context.login(newUser);
                return newUser;
            }
            catch (error) {
                console.log("Error in signUp:", error);
                throw new Error("Internal server error");
            }
        }),
        logIn: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            try {
                const { username, password } = input;
                const { user } = yield context.authenticate("graphql-local", {
                    username,
                    password,
                });
                yield context.login(user);
                return user;
            }
            catch (error) {
                console.log("Error in logIn:", error);
                throw new Error("Internal server error");
            }
        }),
        logOut: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield context.logout();
                context.req.session.destroy((err) => {
                    if (err)
                        throw new Error("Error while loggin out");
                });
                context.res.clearCookie("connect.sid");
                return { message: "Logged out successfully" };
            }
            catch (error) {
                console.log("Error while loggin out:", error);
                throw new Error("Internal server error");
            }
        }),
    },
};
exports.default = userResolver;
