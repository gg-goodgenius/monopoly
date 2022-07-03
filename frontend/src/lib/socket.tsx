import { io } from "socket.io-client"


export const initialSocket = async (url:string) => {
    const socket = io(url)

    socket.on("connect", ()=> {
        console.log("TONOPOLY: Connect to server via socket", socket.id);
    })

    socket.on("disconnect", ()=> {
        console.log("TONOPOLY: Disconnect from server via socket", socket.id);
    })

    socket.on("updateCurrentOnline", (data: any)=>{
        console.log("TONOPOLY: Update current online gamers", data);

    })

    socket.on("updateGame", (data: any)=>{
        console.log("TONOPOLY: Update games state", data);
    })

    socket.on("error", (data: any)=>{
        console.error("TONOPOLY:", data);
    })

    return socket
}