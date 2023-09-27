import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);


    useEffect(() => {
        if (!user) {
            axios
                .get('http://localhost:8000/profile', {withCredentials: true})
                .then((data) => {
                    setUser(data);
                    console.log({"User Context Data": data})
                })
                .catch((error) => {
                    console.error({"Error fecthing profile data": error});
                });
        }
    }, [user])


    return (
        <UserContext.Provider value={user, setUser}>
            {children}
        </UserContext.Provider>
    )
}
