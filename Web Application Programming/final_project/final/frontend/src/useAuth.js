import {createContext, useContext, useState} from "react";

const AuthContext = createContext({
    loggedIn: '',
})

const AuthProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState('');

    return (
        <AuthContext.Provider 
            value={{
                loggedIn,
                setLoggedIn
            }}
            {...props}
        />
    )
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}