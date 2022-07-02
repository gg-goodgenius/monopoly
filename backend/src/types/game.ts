import {FieldsState} from "../contatnts";

export enum StatusGame {
    PROCESS,
    WAITING
}


export interface Game {
    fields: FieldsState
    status: StatusGame,
    bank: {},
    users: {
            address: string,
            name?: string,
            balance: number
    }[]
}