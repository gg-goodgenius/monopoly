import {Game} from "./game";


interface ChannelState {
    balanceA: number,
    balanceB: number,
    seqnoA: number,
    seqnoB: number
}

export interface ServerToClientEvents {
    updateCurrentOnline: (countOnline: number) => void
    error: (msg: string) => void
    updateGame: (game: Game) => void
    changeBalance: (diff: any) => void,
    initChannel: ({} : {channelId: number, publicKey: string, address: string }) => void,
    updateStateChannel: ({}: {balanceA: number, }) => void
}

export interface ClientToServerEvents {
    getCurrentOnline: () => void,
    joinGame: () => void,
    startGame: () => void,
    finishGame: () => void,
    startStep: () => void,
    doActionStep: (type: 'buy' | 'upgrade' | 'sell' | 'payRent', id?: number) => void,
    finishStep: () => void
}