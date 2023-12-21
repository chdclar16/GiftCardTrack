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
const Register = () => {
    const [data, setData] = (0, react_1.useState)({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const registerUser = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { username, password, confirmPassword } = data;
        if (password !== confirmPassword) {
            react_hot_toast_1.toast.error("Passwords do not match");
            return;
        }
        try {
            const { data } = yield axios_1.default.post('http://localhost:3000/auth/register', { username, password });
            if (data.error) {
                react_hot_toast_1.toast.error(data.error);
            }
            else {
                setData({});
                react_hot_toast_1.toast.success('Registered user');
                navigate('/login');
            }
        }
        catch (err) {
            console.log(err);
            react_hot_toast_1.toast.error(err.response.data.error);
        }
    });
    return (React.createElement("div", null,
        React.createElement("form", { onSubmit: registerUser },
            React.createElement("label", null, "Username:"),
            React.createElement("input", { type: 'text', placeholder: 'Username...', value: data.username, onChange: (e) => setData(Object.assign(Object.assign({}, data), { username: e.target.value })) }),
            React.createElement("label", null, "Password:"),
            React.createElement("input", { type: 'password', placeholder: 'Password...', value: data.password, onChange: (e) => setData(Object.assign(Object.assign({}, data), { password: e.target.value })) }),
            React.createElement("label", null, "Confirm Password:"),
            React.createElement("input", { type: 'password', placeholder: 'Confirm Password...', value: data.confirmPassword, onChange: (e) => setData(Object.assign(Object.assign({}, data), { confirmPassword: e.target.value })) }),
            React.createElement("button", { type: 'submit' }, "Register"))));
};
exports.default = Register;
