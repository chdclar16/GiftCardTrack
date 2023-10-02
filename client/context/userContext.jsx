import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedInContext, setIsLoggedInContext] = useState(false);

    // We added is loading to wait for the user data to be fetched
    
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
                    setIsLoading(false);
                    console.log({"User Context Data": response.data})
                })
                .catch((error) => {
                    console.error({"Error fecthing profile data": error});
                    setIsLoading(false);
                });
        }
    }, [isLoggedInContext]);



    return (
        <UserContext.Provider value={{ user, setUser, logout, isLoggedInContext, setIsLoggedInContext }}>
            {children}
        </UserContext.Provider>
    )
}
