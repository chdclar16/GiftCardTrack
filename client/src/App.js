"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const userContext_1 = require("../context/userContext");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const react_hot_toast_1 = require("react-hot-toast");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
const Login_1 = __importDefault(require("./pages/Login"));
const Register_1 = __importDefault(require("./pages/Register"));
const NewGiftCard_1 = __importDefault(require("./pages/NewGiftCard"));
require("./styles.css");
const GiftCardList_1 = __importDefault(require("./pages/GiftCardList"));
function App() {
    return (React.createElement(userContext_1.UserContextProvider, null,
        React.createElement(Navbar_1.default, null),
        React.createElement(react_hot_toast_1.Toaster, { position: "bottom-right", toastOptions: { duration: 2000 } }),
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(Home_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/login", element: React.createElement(Login_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/register", element: React.createElement(Register_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/new", element: React.createElement(NewGiftCard_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/list", element: React.createElement(GiftCardList_1.default, null) }))));
}
exports.default = App;
