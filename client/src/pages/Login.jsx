import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      await axios.post(
        "http://localhost:3000/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setData({});
      navigate("/");
    } catch (err) {
      console.log({ "login error": err.message });
      if (err.response.status === 404) {
        toast.error(err.response.data.error);
      }
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/auth/");
      if (res) toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginUser}>
          <label className="black text-sm font-medium leading-6 text-gray-900">
            Username:
          </label>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Username..."
              value={data.username}
              onChange={(e) => {
                setData({
                  ...data,
                  username: e.target.value,
                });
              }}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-insert focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password..."
            value={data.password}
            onChange={(e) => {
              setData({
                ...data,
                password: e.target.value,
              });
            }}
            required
            className=""
          />
          <button type="submit">Login</button>
        </form>
        {user ? <button onClick={logoutUser}>Logout</button> : null}
      </div>
    </>
  );
};

export default Login;
