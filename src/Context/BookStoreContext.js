import { useEffect } from "react";
import {createContext, useState } from "react";

const allContexts = createContext()

export const BookStoreDataProvider = ({children}) => {
    // useEffect(() => {
    //     const orders = JSON.parse(localStorage.getItem('orders')).length

    // },[])

    // const initialBaj = localStorage.setItem('baj',JSON.stringify(0))


    const [baj, setBaj] = useState(0)
    
    return ( 

        <allContexts.Provider value = {{baj, setBaj}}>
            {children}
        </allContexts.Provider>

     );
}
 
export default allContexts;