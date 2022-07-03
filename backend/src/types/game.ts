import {FieldState} from "../contatnts";

export enum StatusGame {
    PROCESS,
    WAITING
}


export interface Game {
    fields: FieldState[]
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
    color: string,
    currentStep: boolean,
    publicKey: string,
}

export interface Step {
    user: Gamer,
    countActions: number
}