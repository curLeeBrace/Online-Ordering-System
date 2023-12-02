import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    //marame pang data lalagay dito soon like, dlient orders.. pero eto muna hehe
    const [username, setUsername] = useState(null);

    
    const resetUsername = () =>{
        setUsername(null);
    }

    return(
        <AuthContext.Provider value = {{username, setUsername, resetUsername}}>

            {children}

        </AuthContext.Provider>
    )

    
}

export const useAuth = () => {
    return useContext(AuthContext);
}
