"use strict";
"use client";
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
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const SignUpPage = () => {
    const [signUpData, setSignUpData] = (0, react_1.useState)({
        name: "",
        username: "",
        password: "",
        gender: "",
    });
    // signup mutation will be added later
    // const [signup, { loading }] = useMutation(SIGN_UP, {
    //   refetchQueries: ["GetAuthenticatedUser"],
    // });
    // type any for now
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // await signup({
            //   variables: {
            //     input: signUpData,
            //   },
            // });
        }
        catch (error) {
            console.error("Error:", error);
            react_hot_toast_1.default.error("Something Went Wrong!");
        }
    });
    // type any for now
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "radio") {
            setSignUpData((prevData) => (Object.assign(Object.assign({}, prevData), { gender: value })));
        }
        else {
            setSignUpData((prevData) => (Object.assign(Object.assign({}, prevData), { [name]: value })));
        }
    };
    return (<div className="h-screen flex justify-center items-center">
      <h1 className="text-3xl">Register with Us</h1>
    </div>);
};
exports.default = SignUpPage;
