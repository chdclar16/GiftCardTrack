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
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = require("react-hot-toast");
const react_1 = require("react");
const userContext_1 = require("../../context/userContext");
const LogOutButton = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { setUser } = (0, react_1.useContext)(userContext_1.UserContext);
    const clearCookies = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };
    const handleLogOut = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.delete("http://localhost:3000/auth/");
            clearCookies();
            setUser(null);
            if (res)
                react_hot_toast_1.toast.success("Logged Out Successfully");
            navigate("/login");
        }
        catch (err) {
            react_hot_toast_1.toast.error("Failed to logout.");
            console.error(err);
        }
    });
    return React.createElement("button", { onClick: handleLogOut }, "Logout");
};
exports.default = LogOutButton;
