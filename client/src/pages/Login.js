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
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = require("react-hot-toast");
const react_router_dom_1 = require("react-router-dom");
const userContext_1 = require("../../context/userContext");
const Login = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [data, setData] = (0, react_1.useState)({
        username: "",
        password: "",
    });
    const { setIsLoggedInContext } = (0, react_1.useContext)(userContext_1.UserContext);
    const loginUser = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { username, password } = data;
        try {
            const response = yield axios_1.default.post("http://localhost:3000/auth/login", {
                username,
                password,
            }, {
                withCredentials: true,
            });
            console.log(response);
            if (response === null || response === void 0 ? void 0 : response.data) {
                setIsLoggedInContext(true);
            }
            console.log("response", response);
            setData({});
            navigate("/");
        }
        catch (err) {
            console.log({ "login error": err.message });
            react_hot_toast_1.toast.error(err.message);
        }
    });
    return (React.createElement("div", { className: "bg-gray-100 flex justify-center items-center h-screen" },
        React.createElement("div", { className: "w-1/2 h-screen hidden lg:block" },
            React.createElement("img", { src: "/images/giftCard.jfif", alt: "Gift Card", className: "object-cover w-full h-full" })),
        React.createElement("div", { className: "lg:p-35 md:p-52 sm:20 p-8 w-full lg:w-1/2" },
            React.createElement("h1", { className: "text-2xl font-semibold mb-4" }, "Login"),
            React.createElement("form", { onSubmit: loginUser },
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "username", className: "block text-gray-600" }, "Username:"),
                    React.createElement("input", { type: "text", placeholder: "Username...", value: data.username, onChange: (e) => {
                            setData(Object.assign(Object.assign({}, data), { username: e.target.value }));
                        }, className: "bg-white w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500", autoComplete: "off", id: "username" })),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "password", className: "block text-gray-600" },
                        "Password:",
                        " "),
                    React.createElement("input", { type: "password", placeholder: "Password...", value: data.password, onChange: (e) => {
                            setData(Object.assign(Object.assign({}, data), { password: e.target.value }));
                        }, className: "bg-white w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500", autoComplete: "off", id: "password" })),
                React.createElement("button", { type: "submit", className: "bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" }, "Login"),
                React.createElement("div", { className: "mt-6 text-blue-500 text-center" },
                    React.createElement(react_router_dom_1.Link, { to: "/register" },
                        React.createElement("p", { className: "hover:underline " }, "Sign up here")))))));
};
exports.default = Login;
