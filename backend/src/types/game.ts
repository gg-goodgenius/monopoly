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
    users: Gamer[],
    dice: number[]
}

export interface Gamer {
    index: number,
    address: string,
    socketId: string,
    balance: number,
    positionFieldId: number,
}

export interface Step {
    user: Gamer,
    countActions: number
}