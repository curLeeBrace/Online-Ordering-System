import {useState, useContext, createContext} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => { 
    const [jwtToken, setJwtToken] = useState(null);
   

    
    const login = (jwtToken) => {
        setJwtToken(jwtToken);
    } 
    const logout = () => {
        setJwtToken(null);
    }

 
    return (
        <AuthContext.Provider value = {{jwtToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}