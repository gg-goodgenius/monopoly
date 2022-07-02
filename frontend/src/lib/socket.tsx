import { io } from "socket.io-client"


export const initialSocket = (url:string) => {
    const socket = io(url)

    socket.on("connect", ()=> {
        console.log("TONOPOLY: Connect to server via socket", socket.id);
    })

    socket.on("disconnect", ()=> {
        console.log("TONOPOLY: Disconnect from server via socket", socket.id);
    })

    socket.on("updateCurrentOnline", (data)=>{
        console.log("TONOPOLY: Update current online gamers", data);
    })

    socket.on("updateGame", (data)=>{
        console.log("TONOPOLY: Update games state", data);
    })

    socket.on("error", (data)=>{
        console.error("TONOPOLY:", data);
    })

    return socket
}