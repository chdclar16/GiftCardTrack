"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const io5_1 = require("react-icons/io5");
const userContext_1 = require("../../context/userContext");
const react_1 = require("react");
const LogOutButton_1 = __importDefault(require("./LogOutButton"));
const NavBar = () => {
    const { user } = (0, react_1.useContext)(userContext_1.UserContext);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (user) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [user]);
    (0, react_1.useEffect)(() => {
        if (user) {
            setIsLoggedIn(true);
            console.log("User Logged", user);
            console.log(user, "user");
        }
        else {
            setIsLoggedIn(false);
        }
    }, [user]);
    return (React.createElement("div", { className: "bg-blue-500" },
        React.createElement("nav", { className: "relative px-4 py-4 flex justify-between items-center" },
            React.createElement(react_router_dom_1.Link, { className: "text-3xl font-bold leading-none w-8 h-8" },
                React.createElement("img", { src: "/images/giftCard.png", alt: "Gift Card", className: "w-8 h-8" })),
            React.createElement(react_router_dom_1.Link, { to: "/", className: "hover:scale-150 duration-150 ease-in-out" },
                React.createElement(io5_1.IoHomeOutline, null)),
            isLoggedIn ? (React.createElement(React.Fragment, null,
                React.createElement(react_router_dom_1.Link, { to: "/new" },
                    React.createElement("span", null, "New Card")),
                React.createElement(react_router_dom_1.Link, { to: "/list" },
                    React.createElement("span", null, "Gift Cards")),
                React.createElement(LogOutButton_1.default, null))) : (React.createElement(react_router_dom_1.Link, { to: "/login" },
                React.createElement("button", null, "Login"))))));
};
exports.default = NavBar;
