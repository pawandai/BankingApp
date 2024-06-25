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
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const graphql_passport_1 = require("graphql-passport");
const configurePassport = () => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    }));
    passport_1.default.use(new graphql_passport_1.GraphQLLocalStrategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ username });
            if (!user)
                throw new Error("Invalid User Credentials");
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword)
                throw new Error("Invalid User Credentials");
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    })));
});
exports.configurePassport = configurePassport;
