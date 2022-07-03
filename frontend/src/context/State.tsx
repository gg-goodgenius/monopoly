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

    useEffect(() => {
        const myprofile = async () => {
            const dataProfile = await gameProfile()
            setProfile(dataProfile)
            const socket = io('ws://localhost:3000?address=' + dataProfile.address + '&publicKey=' + dataProfile.keys.publicKey)
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
                setUser(data?.users.find((e: any) => e?.address == dataProfile?.address))
            })
            socket.on("error", (data: any) => {
                console.error("TONOPOLY:", data);
            })
            socket.on("changeBalance", (data: any) => {
                console.log("TONOPOLY: change balance", data);
            })

            socket.on("updateStateChannel", (data: any) => {
                console.log("TONOPOLY: update state channel", data);
                const sign = async () => {
                    const signState = await payment.channel.signState(data)
                    return signState
                }
                console.log("TONOPOLY: sign state", sign());
            })

            socket.on("initChannel", (data: any) => {
                console.log("TONOPOLY: update payments channel")
                const TonWeb = require("tonweb");
                const BN = TonWeb.utils.BN;
                const toNano = TonWeb.utils.toNano;
                const channelId = data.channelId;
                const tonweb = profile.tonweb;
                const publicBankKey = data.publicKey;
                const addressBank = data.address;

                const channelInitState = {
                    balanceA: toNano('15'),
                    balanceB: toNano('15'),
                    seqnoA: new BN(0),
                    seqnoB: new BN(0)
                };
                const channelConfig = {
                    channelId: new BN(channelId),
                    addressA: profile.address,
                    addressB: addressBank,
                    initBalanceA: channelInitState.balanceA,
                    initBalanceB: channelInitState.balanceB
                }
                const channel = tonweb.payments.createChannel({
                    ...channelConfig,
                    isA: false,
                    myKeyPair: profile.keys,
                    hisPublicKey: publicBankKey,
                });

                const fromWallet = channel.fromWallet({
                    wallet: profile.wallet,
                    secretKey: profile.keys.secretKey
                })

                const updateBalance = async () => {
                    await fromWallet
                        .topUp({ coinsA: new BN(0), coinsB: channelInitState.balanceB })
                        .send(channelInitState.balanceB.add(toNano('0.05')));

                }
                updateBalance()
                setPayment({ channel, fromWallet })
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
                setPayment
            }}
        >
            {children}
        </StateContext.Provider>
    );
}