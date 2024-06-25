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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const src_1 = require("./src");
const database_1 = require("./src/database");
const passport_config_1 = require("./src/config/passport.config");
const port = process.env.PORT || 7000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, passport_config_1.configurePassport)();
        const app = yield (0, src_1.GraphQL)();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
        yield (0, database_1.connectToDB)();
    });
}
startServer();
