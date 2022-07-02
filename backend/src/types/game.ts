import {FieldsState} from "../contatnts";

export enum StatusGame {
    PROCESS,
    WAITING
}


export interface Game {
    nextStepSocketId?: string,
    fields: FieldsState
    status: StatusGame,
    bank: {},
    users: Gamer[]
}

export interface Gamer {
    index: number,
    address: string,
    socketId: string,
    name?: string,
    balance: number,
    countSteps: number,
    position: number,
}

export interface Step {
    user: Gamer,
    countActions: number
}