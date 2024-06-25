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
exports.GraphQL = GraphQL;
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const server_1 = require("@apollo/server");
const types_1 = __importDefault(require("./types"));
const resolvers_1 = __importDefault(require("./resolvers"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const graphql_passport_1 = require("graphql-passport");
function GraphQL() {
    return __awaiter(this, void 0, void 0, function* () {
        const MONGODB_URI = process.env.MONGODB_URI || "";
        const SESSION_SECRET = process.env.SESSION_SECRET || "";
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        app.use((0, cors_1.default)({
            origin: "http://localhost:5000",
            credentials: true,
        }));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.static("uploads"));
        const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
        const store = new MongoDBStore({
            uri: MONGODB_URI,
            collection: "sessions",
        });
        store.on("error", (error) => console.log(error));
        app.use((0, express_session_1.default)({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            },
            store: store,
        }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        const graphQLServer = new server_1.ApolloServer({
            typeDefs: types_1.default,
            resolvers: resolvers_1.default,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield graphQLServer.start();
        app.use("/api", (0, express4_1.expressMiddleware)(graphQLServer, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req, res }) { return (0, graphql_passport_1.buildContext)({ req, res }); }),
        }));
        return app;
    });
}
