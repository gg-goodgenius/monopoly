import {Game} from "./game";

export interface ServerToClientEvents {
    updateCurrentOnline: (countOnline: number) => void
    error: (msg: string) => void
    updateGame: (game: Game) => void
    changeBalance: (diff: number) => void
}

export interface ClientToServerEvents {
    getCurrentOnline: () => void,
    joinGame: () => void,
    startGame: () => void,
    finishGame: () => void,
    startStep: () => void,
    doActionStep: (type: 'buy' | 'offer' | 'sell' | 'payRent', id?: number) => void,
    finishStep: () => void
}