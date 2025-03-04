import React, { useEffect, useState } from "react";
import { getUserAccount } from "../service/apiService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const defaultUser = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: "",
    }
    const [user, setUser] = useState(defaultUser)

    const doLoginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    }

    const doLogoutContext = () => {
        setUser(user => ({
            name: '',
            auth: false
        }))
    }

    const fetchUser = async () => {
        let res = await getUserAccount();
        if (res && res.EC === 0) {
            let groupWithRoles = res.DT.data.groupWithRoles;
            let email = res.DT.data.email;
            let username = res.DT.data.username;
            let token = res.DT.access_token;

            let data = {
                isLoading: false,
                isAuthenticated: true,
                token: token,
                account: {
                    groupWithRoles, email, username
                }
            }

            setTimeout(() => {
                setUser(data)
            }, 1500)

        } else {
            setUser({ ...defaultUser, isLoading: false })
        }
    }

    console.log(user)

    const nonGetAccount = ['/login', '/register']
    useEffect(() => {
        if (nonGetAccount.includes(window.location.pathname)) {
            setUser({ ...defaultUser, isLoading: false })
            return
        }

        fetchUser();

    }, [])

    return (
        <UserContext.Provider value={{ user, doLoginContext, doLogoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext, UserProvider
} 