import {createContext, useState} from "react";

export const StateContext = createContext<any>(null);

export const State = ({children}: any) => {
    const [address,setAddress] = useState('');

    return(
        <StateContext.Provider
            value={{
                address,
                setAddress
            }}
        >
            {children}
        </StateContext.Provider>
    );
}