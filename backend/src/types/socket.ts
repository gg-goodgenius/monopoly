import {Game} from "./game";

export interface ServerToClientEvents {
    updateCurrentOnline: (countOnline: number) => void
    error: (msg: string) => void
    updateGame: (game: Game) => void
}

export interface ClientToServerEvents {
    getCurrentOnline: () => void,
    joinGame: (address: string) => void,
    startGame: () => void
}