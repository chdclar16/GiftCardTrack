import * as React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

interface User {}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedInContext: boolean;
  setIsLoggedInContext: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedInContext: false,
  setIsLoggedInContext: () => {},
  logout: () => {},
});

interface ChildrenTypes {
  children: React.ReactNode;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function UserContextProvider({ children }: ChildrenTypes) {
  const [user, setUser] = useState(null);
  const [isLoggedInContext, setIsLoggedInContext] = useState(false);

  console.log(user);
  const logout = () => {
    setUser(null);
    setIsLoggedInContext(false);
  };

  useEffect(() => {
    if (isLoggedInContext) {
      axios
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

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, isLoggedInContext, setIsLoggedInContext }}
    >
      {children}
    </UserContext.Provider>
  );
}
