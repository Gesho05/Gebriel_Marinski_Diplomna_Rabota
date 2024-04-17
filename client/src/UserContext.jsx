import axios from "axios";
import { createConnection, createContext, useEffect, useState } from "react";

//this file is to check if user is loged in in all routes

export const UserContext = createContext({});

export function UserContextProvider({children}){
    //the state of the user
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect( ()=>{
        // checks if user is empty
        if(!user){
            axios.get('/profile').then(({data}) =>{
               setUser(data);
               setReady(true);
            }); 
        } 
    }, []);
    return(
        <UserContext.Provider value={{user,setUser, ready}}>
           {children} 
        </UserContext.Provider>
    );
}