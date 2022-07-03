import {
    FieldChance,
    FieldChest,
    FieldCourt, FieldCompany, FieldFreeParking,
    FieldJail,
    FieldObject,
    FieldStart,
    FieldTax
} from "./types/fields";


export type FieldState =
    FieldStart |
    FieldTax |
    FieldChest |
    FieldChance |
    FieldJail |
    FieldCourt |
    FieldObject |
    FieldFreeParking |
    FieldCompany;

export const fields: FieldState[] = [
    {
        id: 0,
        name: 'GO',
        type: 'start'
    },
    {
        id: 1,
        color: "dark-purple",
        name: "MEDITER-RANEAN AVENUE",
        price: 0.5,
        type: 'object',
        level: 0
    },
    {
        id: 2,
        name: 'COMMUNITY CHEST',
        type: 'chest'
    },
    {
        id: 3,
        color: "dark-purple",
        name: "BALTIC AVENUE",
        price: 0.5,
        type: 'object',
        level: 0
        
    },
    {
        id: 4,
        name: 'INCOME TAX',
        type: 'tax',
        tax: 2
    },
    {
        id: 5,
        name: "READING RAILROAD",
        price: 2,
        type: 'object',
        color: 'black',
        level: 0
    },
    {
        id: 6,
        name: "ORENTAL AVENUE",
        price: 1,
        type: 'object',
        color: 'light-blue',
        level: 0
    },
    {
        id: 7,
        color: "light-blue",
        name: "VERMONT AVENUE",
        price: 1,
        type: 'object',
        level: 0
    },
    {
        id: 8,
        name: 'CHANCE',
        type: 'chance'
    },
    {
        id: 9,
        color: "light-blue",
        name: "CONNECTICUT AVENUE",
        price: 1.2,
        type: 'object',
        level: 0
    },
    {
        id: 10,
        type: 'jail',
        name: 'IN JAIL'
    },
    {
        id: 11,
        color: "purple",
        name: "ST. CHARLES PLACE",
        price: 1.4,
        type: 'object',
        level: 0
    },
    {
        id: 12,
        name: 'electric company',
        price: 1.5,
        type: 'company'
    },
    {
        id: 13,
        color: "purple",
        name: "STATES AVENUE",
        price: 1.4,
        type: 'object',
        level: 0
    },
    {
        id: 14,
        color: "purple",
        name: "VIRGINIA AVENUE",
        price: 1.6,
        type: 'object',
        level: 0
    },
    {
        id: 15,
        name: 'Railroad',
        type: 'object',
        color: 'black',
        price: 2,
        level: 0
    },
    {
        id: 16,
        color: "orange",
        name: "ST. JAMES AVENUE",
        price: 1.8,
        type: 'object',
        level: 0
        
    },
    {
        id: 17,
        name: 'COMMUNITY  CHEST',
        type: 'chest'
    },
    {
        id: 18,
        color: "orange",
        name: "TENNESSEE AVENUE",
        price: 1.8,
        type: 'object',
        level: 0
    },
    {
        id: 19,
        color: "orange",
        name: "NEW YORK AVENUE",
        price: 2,
        type: 'object',
        level: 0
    },
    {
        id: 20,
        type: 'free_parking',
        name: 'FREE PARKING'
    },
    {
        id: 21,
        color: "red",
        name: "KENTUCKY AVENUE",
        price: 2.2,
        type: 'object',
        level: 0
    },
    {
        id: 22,
        name: 'CHANCE',
        type: 'chance'
    },
    {
        id: 23,
        color: "red",
        name: "INDIANA AVENUE",
        price: 2.2,
        type: 'object',
        level: 0
    },
    {
        id: 24,
        color: "red",
        name: "ILLINOIS AVENUE",
        price: 2,
        type: 'object',
        level: 0
    },
    {
        id: 25,
        name: 'Railway',
        type: 'object',
        color: 'black',
        price: 2
    },
    {
        id: 26,
        color: "yellow",
        name: "ATLANTIC AVENUE",
        price: 2.6,
        type: 'object',
        level: 0
    },
    {
        id: 27,
        color: "yellow",
        name: "VENTNOR AVENUE",
        price: 2.6,
        type: 'object',
        level: 0
    },
    {
        id: 28,
        type: 'company',
        name: 'waterworks',
        price: 1.2
    },
    {
        id: 29,
        color: "yellow",
        name: "MARVIN GARDENS",
        price: 2.8,
        type: 'object',
        level: 0
    },
    {
        id: 30,
        type: 'court',
        name: 'GO TO JAIL',
    },
    {
        id: 31,
        color: "green",
        name: "PACIFIC AVENUE",
        price: 3,
        type: 'object',
        level: 0
    },
   
    {
        id: 32,
        color: "green",
        name: "NORTH CAROLINA AVENUE",
        price: 3,
        type: 'object',
        level: 0
    },
    {
        id: 33,
        type: 'chest',
        name: 'COMMUNITY  CHEST'
    },
    {
        id: 34,
        color: "green",
        name: "PENNSYLVANIA AVENUE",
        price: 3.2,
        type: 'object',
        level: 0
    },
    {
        id: 35,
        type: 'object',
        color: 'black',
        name: 'SHORT LINE',
        price: 2
    },
    {
        id: 36,
        type: 'chance',
        name: 'CHANCE'
    },
    {
        id: 37,
        color: "dark-blue",
        name: "PARK PLACE",
        price: 3.5,
        type: 'object',
        level: 0
    },
    {
        id: 38,
        name: 'LUXORY TAX',
        type: 'tax',
        tax: 0.75,
    },
    {
        id: 39,
        color: "dark-blue",
        name: "BOARDWALK",
        price: 4,
        type: 'object',
        level: 0
    },
];

