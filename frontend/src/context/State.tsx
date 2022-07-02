import {createContext, useState, useEffect} from "react";
import gameProfile from './../lib/ton'
import { io } from "socket.io-client"

export const StateContext = createContext<any>(null);

export const State = ({children}: any) => {
    const [ profile, setProfile ] = useState<any>();
    const [ cubes, setCubes ] = useState<any>();
    const [ listGamers, setListGamers ] = useState<any>([
        {
            name: "0x00",
            balance: "14",
            active: false
        },
        {
            name: "0x01",
            balance: "1",
            active: false
        },
        {
            name: "0x02",
            balance: "14",
            active: true
        },
    ]);
    const [ myCards, setMyCards ] = useState<any>([
        {
            name: "BOARDWALK",
            level: 2,
            color: 'dark-blue'
        },
        {
            name: "MEDITER-RANEAN AVENUE",
            level: 0,
            color: 'dark-purple'
        },
        {
            name: "BALTIC AVENUE",
            level: 5,
            color: 'dark-purple'
        },
        {
            name: "PENNSYLVANIA AVENUE",
            level: 3,
            color: 'green'
        },
    ])

    const [ socket, setSocket ] = useState<any>()



    useEffect(()=>{
        const profile = async () => { 
            const data = await gameProfile()
            setProfile(data)
        }
        profile()
        setCubes([0,0])
        const socket = io("ws://127.0.0.1:3000");
    },[])

    return(
        <StateContext.Provider
            value={{
                profile,
                setProfile,
                cubes,
                setCubes,
                listGamers,
                setListGamers,
                myCards,
                setMyCards
            }}
        >
            {children}
        </StateContext.Provider>
    );
}