import React, {useState} from 'react';

const AuthContext = React.createContext({

    token:'',
    isLoggedIn:false,
    login: (token)=>{},
    logout:()=>{}
});


export const AuthContextProvider = (props) =>{
    // controllo se è preserente un token salvato nella memoria locale del browser
    const initialToken = localStorage.getItem('token');

    const [token, setToken] =useState(initialToken)

    const userIsLoggedIn= !!token; // !! trasforma i valori in boolean: se token è una stringa vuota allora !!token = false

    const loginHandler = (token)=>{
        setToken(token);
        //salvo il token nella memoria locale del browser
        localStorage.setItem('token', token);
    }
    const logoutHandler = ()=>{
        setToken(null);
        //cancello il token dalla memoria locale del browser
        localStorage.removeItem('token');
    }

    const contextValue={
        token :token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
    )

};

export default AuthContext;

