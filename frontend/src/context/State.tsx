import {createContext, useState, useEffect} from "react";
import gameProfile from './../lib/ton'

export const StateContext = createContext<any>(null);

export const State = ({children}: any) => {
    const [ profile, setProfile ] = useState<any>();

    useEffect(()=>{
        const profile = async () => { 
            const data = await gameProfile()
            setProfile(data)
        }
        profile()
    },[])

    return(
        <StateContext.Provider
            value={{
                profile,
                setProfile
            }}
        >
            {children}
        </StateContext.Provider>
    );
}