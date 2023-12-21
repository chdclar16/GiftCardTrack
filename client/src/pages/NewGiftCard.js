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
const react_1 = require("react");
const react_hot_toast_1 = require("react-hot-toast");
const userContext_1 = require("../../context/userContext");
const NewGiftCard = () => {
    const { user } = (0, react_1.useContext)(userContext_1.UserContext);
    const [data, setData] = (0, react_1.useState)({
        name: "",
        balance: "",
        photo: "",
        user: user.id,
    });
    // Removes number spinner on balance
    const handleBalanceChange = (e) => {
        const newValue = e.target.value.replace(/[^0-9]/g, "");
        setData(Object.assign(Object.assign({}, data), { balance: newValue }));
    };
    const handleCreateNew = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { name, balance, photo, user } = data;
        console.log("handleCreateNew", data);
        try {
            const res = yield axios_1.default.post("http://localhost:3000/card", {
                name,
                balance,
                photo,
                user,
            });
            if (res.data.error) {
                react_hot_toast_1.toast.error(res.data.error);
            }
            else {
                setData({
                    name: "",
                    balance: "",
                    photo: "",
                    user: "",
                });
                react_hot_toast_1.toast.success("Created new giftcard");
            }
        }
        catch (err) {
            console.log(err);
            react_hot_toast_1.toast.error("Failed to create giftcard");
        }
    });
    return (React.createElement("div", { className: "w-full  flex justify-center items-center h-screen xl:h-screen-80" },
        React.createElement("form", { onSubmit: handleCreateNew, className: "bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 w-96", id: "giftCardForm" },
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { className: "block text-gray-700 text-lg font-bold mb-2" }, "Gift Card Name"),
                React.createElement("input", { type: "text", placeholder: "Gift Card Name...", value: data.name, onChange: (e) => setData(Object.assign(Object.assign({}, data), { name: e.target.value })), required: true, className: "shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-non focus:shadow-outline bg-white" })),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { className: "block text-gray-700 text-lg font-bold mb-2" }, "Gift Card Balance"),
                React.createElement("input", { type: "text", placeholder: "Gift Card Balance...", value: data.balance, onChange: handleBalanceChange, required: true, className: "shadow appearance-none border rounded w-full py-2 px-3 bg-white" })),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { className: "block text-gray-700 text-lg font-bold mb-2" }, "Gift Card Photo"),
                React.createElement("input", { type: "text", placeholder: "Photo URL(Optional)", value: data.photo, onChange: (e) => setData(Object.assign(Object.assign({}, data), { photo: e.target.value })), className: "shadow appearance-none border rounded w-full py-2 px-3 bg-white" })),
            React.createElement("div", { className: "flex justify-end " },
                React.createElement("button", { type: "submit", className: "btn btn-primary bg-blue-500 hover:bg-blue-700 text-black border-inherit hover:border-inherit" }, "Create")))));
};
exports.default = NewGiftCard;
