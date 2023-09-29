import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // We added is loading to wait for the user data to be fetched

    useEffect(() => {
        if (!user) {
            axios
                .get('http://localhost:3000/auth/profile', {withCredentials: true})
                .then((data) => {
                    setUser(data);
                    setIsLoading(false);
                    console.log({"User Context Data": data})
                })
                .catch((error) => {
                    console.error({"Error fecthing profile data": error});
                    setIsLoading(false);
                });
        }
    }, [user])


    return (
        <UserContext.Provider value={{user, setUser}}>
            {!isLoading && children}
        </UserContext.Provider>
    )
}
