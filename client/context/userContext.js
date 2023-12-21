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
exports.UserContextProvider = exports.UserContext = void 0;
const React = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const prop_types_1 = __importDefault(require("prop-types"));
exports.UserContext = (0, react_1.createContext)({
    user: null,
    setUser: () => { },
    isLoggedInContext: false,
    setIsLoggedInContext: () => { },
    logout: () => { },
});
UserContextProvider.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
function UserContextProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoggedInContext, setIsLoggedInContext] = (0, react_1.useState)(false);
    console.log(user);
    const logout = () => {
        setUser(null);
        setIsLoggedInContext(false);
    };
    (0, react_1.useEffect)(() => {
        if (isLoggedInContext) {
            axios_1.default
                .get("http://localhost:3000/auth/profile", { withCredentials: true })
                .then((response) => {
                setUser(response.data);
                console.log({ "User Context Data": response.data });
            })
                .catch((error) => {
                console.error({ "Error fecthing profile data": error });
            });
        }
    }, [isLoggedInContext]);
    return (React.createElement(exports.UserContext.Provider, { value: { user, setUser, logout, isLoggedInContext, setIsLoggedInContext } }, children));
}
exports.UserContextProvider = UserContextProvider;
