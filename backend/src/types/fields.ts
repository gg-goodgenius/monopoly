import {Gamer} from "./game";

interface Field {
    id: number,
    name: string,
    type:
        'chest' |
        'tax' |
        // 'railroad' |
        'chance' |
        'start' |
        'object' |
        'jail' |
        'free_parking' |
        'court' |
        'company'
}

export interface FieldTax extends Field {
    type: 'tax',
    tax: number
}

export interface FieldChest extends Field {
    type: 'chest'
}
// export interface FieldRailroad extends Field {
//     type: 'railroad',
//     price: number
// }
export interface FieldChance extends Field {
    type: 'chance'
}
export interface FieldObject extends Field {
    type: 'object'
    price: number,
    color: string,
    owner?: {
        index: number
    },
    isOffer?: number,
    level?: number
}

export interface FieldStart extends Field {
    type: 'start'
}
export interface FieldJail extends Field {
    type: 'jail'
}
export interface FieldFreeParking extends Field {
    type: 'free_parking'
}
export interface FieldCourt extends Field {
    type: 'court'
}

export interface FieldCompany extends Field {
    type: 'company',
    price: number
}
