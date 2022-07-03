import { createContext, useState, useEffect } from "react";
import gameProfile from './../lib/ton'
import { io } from "socket.io-client"

export const StateContext = createContext<any>(null);

export const State = ({ children }: any) => {
    const [profile, setProfile] = useState<any>();
    const [gameState, setGameState] = useState<any>();
    const [socket, setSocket] = useState<any>()
    const [user, setUser] = useState<any>()
    const [payment, setPayment] = useState<any>()
    const [channelState, setChannelState] = useState<any>()

    useEffect(() => {
        const myprofile = async () => {
            const dataProfile = await gameProfile()
            setProfile(dataProfile)
            const socket = io(process.env.REACT_APP_SCHEME+'://'+ process.env.REACT_APP_BACKENDIP +'?address=' + dataProfile.address + '&publicKey=' + dataProfile.hexPublicKey)
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
                setUser(data?.users.find((e: any) => e?.address == dataProfile?.address))
            })
            socket.on("error", (data: any) => {
                console.error("TONOPOLY:", data);
            })
            socket.on("changeBalance", (data: any) => {
                console.log("TONOPOLY: change balance", data);
                setChannelState(data)
                
            })

            socket.on("updateStateChannel", (data: any) => {
                console.log("TONOPOLY: update state channel", data);
            })

            socket.on("initChannel", async (data: any) => {
                console.log("TONOPOLY: update payments channel")
                const TonWeb = require("tonweb");
                const BN = TonWeb.utils.BN;
                const toNano = TonWeb.utils.toNano;
                const channelId = data.channelId;
                console.log(channelId);
                
                const tonweb = dataProfile.tonweb;
                
                const publicBankKey = tonweb.utils.hexToBytes(data.publicKey);
                
                const walletBank = tonweb.wallet.create({
                    publicKey: publicBankKey
                });
                const channelInitState = {
                    balanceA: toNano('1'),
                    balanceB: toNano('1'),
                    seqnoA: new BN(0),
                    seqnoB: new BN(0)
                };
                // console.log("TONOPOLY: channelInitState", channelInitState)
                const channelConfig = {
                    channelId: new BN(channelId),
                    addressA: await walletBank.getAddress(),
                    addressB: await dataProfile.wallet.getAddress(),
                    initBalanceA: channelInitState.balanceA,
                    initBalanceB: channelInitState.balanceB
                }
                
                console.log("TONOPOLY: channelConfig",channelConfig)
                const channel = tonweb.payments.createChannel({
                    ...channelConfig,
                    isA: false,
                    myKeyPair: dataProfile.keys,
                    hisPublicKey: publicBankKey,
                });
                
                // console.log("TONOPOLY: channel", channel)
                
                const fromWallet = channel.fromWallet({
                    wallet: dataProfile.wallet,
                    secretKey: dataProfile.keys.secretKey
                })
                console.log("TONOPOLY: fromWallet",fromWallet)
                
                const test = fromWallet.topUp({ coinsA: new BN(0), coinsB: channelInitState.balanceB })
                const address =  (await channel.getAddress()).toString(true, true, true)
                (await fromWallet
                        .topUp({ coinsA: new BN(0), coinsB: channelInitState.balanceB })
                        .send(channelInitState.balanceB.add(toNano('0.05')))).toString();
            
                await fromWallet.init(channelInitState).send(toNano('0.05'));
                console.log("ADDRESS", address);
                setPayment({ channel, address, fromWallet })
                }
            )
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
                user,
                payment,
                setPayment,
                channelState,
                setChannelState
            }}
        >
            {children}
        </StateContext.Provider>
    );
}