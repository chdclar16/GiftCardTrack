"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Home = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", { className: "text-2xl flex justify-center place-content-center mt-10 underline underline-offset-8" }, "Lorem ipsum dolor sit amet."),
        react_1.default.createElement("h2", null, "Keep track of your giftcards today!")));
};
exports.default = Home;
