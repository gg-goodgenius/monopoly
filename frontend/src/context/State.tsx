import { createContext, useState, useEffect } from "react";
import gameProfile from './../lib/ton'
import { io } from "socket.io-client"

export const StateContext = createContext<any>(null);

export const State = ({ children }: any) => {
    const [profile, setProfile] = useState<any>();
    const [cubes, setCubes] = useState<any>();
    const [listGamers, setListGamers] = useState<any>([
        {
            name: "0x00",
            balance: "14",
            active: false,
            offers: [
                {
                    name: "BOARDWALK",
                    color: 'dark-blue',
                    price: 1,
                },
                {
                    name: "MEDITER-RANEAN AVENUE",
                    color: 'dark-purple',
                    price: 1.4,
                },
            ]
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
    const [myCards, setMyCards] = useState<any>([
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
    const [socket, setSocket] = useState<any>()

    useEffect(() => {
        const myprofile = async () => {
            const data = await gameProfile()
            setProfile(data)
            const socket = io('ws://localhost:3000?address=' + data.address)
            socket.on("connect", () => {
                console.log("TONOPOLY: Connect to server via socket", socket.id);
            })
            socket.on("disconnect", () => {
                console.log("TONOPOLY: Disconnect from server via socket", socket.id);
            })
            socket.on("updateCurrentOnline", (data: any) => {
                console.log("TONOPOLY: Update current online gamers", data);

            })
            socket.on("updateGame", (data: any) => {
                console.log("TONOPOLY: Update games state", data);
            })
            socket.on("error", (data: any) => {
                console.error("TONOPOLY:", data);
            })

            setSocket(socket)
            setCubes([0, 0])
        }
        myprofile();

    }, [])

    return (
        <StateContext.Provider
            value={{
                profile,
                setProfile,
                cubes,
                setCubes,
                listGamers,
                setListGamers,
                myCards,
                setMyCards,
                socket,
                setSocket,
            }}
        >
            {children}
        </StateContext.Provider>
    );
}