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
const client_1 = require("@apollo/client");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const SignUpPage = () => {
    const [loginData, setLoginData] = (0, react_1.useState)({
        username: "",
        password: "",
    });
    const [login, { loading }] = (0, client_1.useMutation)(LOGIN, {
        refetchQueries: ["GetAuthenticatedUser"],
    });
    // type any for now
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => (Object.assign(Object.assign({}, prevData), { [name]: value })));
    };
    // type any for now
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!loginData.username || !loginData.password)
            return react_hot_toast_1.default.error("Please fill in all fields");
        try {
            yield login({ variables: { input: loginData } });
        }
        catch (error) {
            console.error("Error logging in:", error);
            react_hot_toast_1.default.error("Something went wrong!");
        }
    });
    return <div>SignUpPage</div>;
};
exports.default = SignUpPage;
