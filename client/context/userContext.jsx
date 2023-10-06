import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoggedInContext, setIsLoggedInContext] = useState(false);


    console.log(user)
    const logout = () => {
        setUser(null);
        setIsLoggedInContext(false);
    };
    
    useEffect(() => {
        if (isLoggedInContext) {
            axios
                .get('http://localhost:3000/auth/profile', {withCredentials: true})
                .then((response) => {
                    setUser(response.data);
                    console.log({"User Context Data": response.data})
                })
                .catch((error) => {
                    console.error({"Error fecthing profile data": error});
                });
        }
    }, [isLoggedInContext]);



    return (
        <UserContext.Provider value={{ user, setUser, logout, isLoggedInContext, setIsLoggedInContext }}>
            {children}
        </UserContext.Provider>
    )
}
