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
const userContext_1 = require("../../context/userContext");
const react_hot_toast_1 = require("react-hot-toast");
const axios_1 = __importDefault(require("axios"));
const GiftCardList = () => {
    const [giftCards, setGiftCards] = (0, react_1.useState)([]);
    const { user } = (0, react_1.useContext)(userContext_1.UserContext);
    // Get giftcards and set them as giftcard state
    const getGiftCards = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(`http://localhost:3000/card/${user.id}`);
            if (res.data) {
                setGiftCards(res.data);
                react_hot_toast_1.toast.success("Grabbed all giftcards");
            }
        }
        catch (err) {
            console.log("Gift Card List Error", err.message);
            react_hot_toast_1.toast.error("Failed to get giftcards");
        }
    });
    console.log("giftcards here", giftCards);
    (0, react_1.useEffect)(() => {
        getGiftCards();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "text-center text-3xl" },
            React.createElement("h1", { className: "flex justify-center font-bold" }, "Gift Cards")),
        React.createElement("div", { className: "flex flex-wrap justify-center" }, giftCards.data &&
            giftCards.data.map((giftCard) => (React.createElement("div", { key: giftCard._id, className: "card w-96 m-4 glass shadow-xl hover:scale-110 ease-in-out duration-300" },
                React.createElement("div", { className: "card-body" },
                    !giftCard.photo ? (React.createElement("figure", null,
                        React.createElement("img", { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOZlTosq_oXxmxXD9z2Fc80Ej3t8iiuZwkQw&usqp=CAU", alt: "card" }))) : (React.createElement("figure", null,
                        React.createElement("img", { src: giftCard.photo, alt: "card" }))),
                    React.createElement("h2", { className: "card-title" }, giftCard.name),
                    React.createElement("p", null, giftCard.balance))))))));
};
exports.default = GiftCardList;
