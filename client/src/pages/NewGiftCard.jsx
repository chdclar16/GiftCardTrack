import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";

const NewGiftCard = () => {
  const { user } = useContext(UserContext);
  console.log("user context", user);
  const [data, setData] = useState({
    name: "",
    balance: "",
    photo: "",
    user: user.data.id,
  });

  // Removes number spinner on balance
  const handleBalanceChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setData({ ...data, balance: newValue });
  };

  const handleCreateNew = async (e) => {
    e.preventDefault();
    const { name, balance, photo, user } = data;
    console.log("handleCreateNew", data);
    try {
      const res = await axios.post("http://localhost:3000/card", {
        name,
        balance,
        photo,
        user,
      });
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setData({
          name: "",
          balance: "",
          photo: "",
          user: "",
        });
        toast.success("Created new giftcard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create giftcard");
    }
  };

  // Detect dark mode and set the appropriate CSS class
  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const formElement = document.getElementById("giftCardForm");

    if (isDarkMode) {
      formElement.classList.add("dark-mode");
    } else {
      formElement.classList.remove("dark-mode");
    }
  }, []);

  return (
    <div className="w-full  flex justify-center items-center h-screen xl:h-screen-80">
      <form
        onSubmit={handleCreateNew}
        className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 w-96"
        id="giftCardForm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Gift Card Name
          </label>
          <input
            type="text"
            placeholder="Gift Card Name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-non focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Gift Card Balance
          </label>
          <input
            type="text"
            placeholder="Gift Card Balance..."
            value={data.balance}
            onChange={handleBalanceChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Gift Card Photo
          </label>
          <input
            type="text"
            placeholder="Photo URL(Optional)"
            value={data.photo}
            onChange={(e) => setData({ ...data, photo: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div className="flex justify-end ">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-black border-inherit hover:border-inherit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewGiftCard;
