import { createContext, useState, useEffect } from "react";
import gameProfile from './../lib/ton'
import { io } from "socket.io-client"

export const StateContext = createContext<any>(null);

export const State = ({ children }: any) => {
    const [profile, setProfile] = useState<any>();
    const [gameState, setGameState] = useState<any>();
    const [socket, setSocket] = useState<any>()
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const myprofile = async () => {
            const dataProfile = await gameProfile()
            setProfile(dataProfile)
            const socket = io('ws://localhost:3000?address=' + dataProfile.address)
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
                setGameState(data)
                console.log(dataProfile.address);
                
                setUser(data?.users.find((e:any)=>e?.address==dataProfile?.address))
            })
            socket.on("error", (data: any) => {
                console.error("TONOPOLY:", data);
            })
            setSocket(socket)
        }
        myprofile();

    }, [])

    return (
        <StateContext.Provider
            value={{
                profile,
                setProfile,
                gameState,
                setGameState,
                socket,
                setSocket,
                user
            }}
        >
            {children}
        </StateContext.Provider>
    );
}