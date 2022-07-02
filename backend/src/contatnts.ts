import {
    FieldChance,
    FieldChest,
    FieldCourt, FieldCompany, FieldFreeParking,
    FieldJail,
    FieldObject,
    FieldRailroad,
    FieldStart,
    FieldTax
} from "./types/fields";

const fields: (
    FieldStart |
    FieldTax |
    FieldChest |
    FieldChance |
    FieldJail |
    FieldCourt |
    FieldRailroad |
    FieldObject |
    FieldFreeParking |
    FieldCompany
    )[] = [
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
        type: 'object'
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
        type: 'object'
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
        type: 'railroad'
    },
    {
        id: 6,
        name: "ORENTAL AVENUE",
        price: 1,
        type: 'object',
        color: 'light-blue'
    },
    {
        id: 7,
        color: "light-blue",
        name: "VERMONT AVENUE",
        price: 1,
        type: 'object'
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
        type: 'object'
    },
    {
        id: 10,
        type: 'jail',
        name: 'IN JAIL'
    },
    {
        id: 11,
        color: "orange",
        name: "NEW YORK AVENUE",
        price: 2,
        type: 'object'
    },
    {
        id: 12,
        color: "orange",
        name: "TENNESSEE AVENUE",
        price: 1.8,
        type: 'object'
    },
    {
        id: 13,
        name: 'COMMUNITY  CHEST',
        type: 'chest'
    },
    {
        id: 8,
        color: "orange",
        name: "ST. JAMES AVENUE",
        price: 1.8,
        type: 'object'
    },
    {
        id: 14,
        name: 'Railroad',
        type: 'railroad',
        price: 2
    },
    {
        id: 15,
        color: "purple",
        name: "VIRGINIA AVENUE",
        price: 1.6,
        type: 'object'
    },
    {
        id: 16,
        color: "purple",
        name: "STATES AVENUE",
        price: 1.4,
        type: 'object'
    },
    {
        id: 17,
        name: 'electric company',
        price: 1.5,
        type: 'company'
    },
    {
        id: 18,
        color: "purple",
        name: "ST. CHARLES PLACE",
        price: 1.4,
        type: 'object'
    },
    {
        id: 19,
        type: 'free_parking',
        name: 'FREE PARKING'
    },
    {
        id: 20,
        color: "red",
        name: "KENTUCKY AVENUE",
        price: 2.2,
        type: 'object'
    },
    {
        id: 21,
        name: 'CHANCE',
        type: 'chance'
    },
    {
        id: 22,
        color: "red",
        name: "INDIANA AVENUE",
        price: 2.2,
        type: 'object'
    },
    {
        id: 23,
        color: "red",
        name: "ILLINOIS AVENUE",
        price: 2,
        type: 'object'
    },
    {
        id: 24,
        name: 'Railway',
        type: 'railroad',
        price: 2
    },
    {
        id: 25,
        color: "yellow",
        name: "ATLANTIC AVENUE",
        price: 2.6,
        type: 'object'
    },
    {
        id: 26,
        color: "yellow",
        name: "VENTNOR AVENUE",
        price: 2.6,
        type: 'object'
    },
    {
        id: 27,
        color: "yellow",
        name: "MARVIN GARDENS",
        price: 2.8,
        type: 'object'
    },
    {
        id: 28,
        type: 'company',
        name: 'waterworks',
        price: 1.2
    },
    {
        id: 29,
        color: "green",
        name: "PACIFIC AVENUE",
        price: 3,
        type: 'object'
    },
    {
        id: 30,
        type: 'court',
        name: 'GO TO JAIL',
    },
    {
        id: 31,
        type: 'object',
        name: 'PACIFIC AVENUE',
        price: 3,
        color: 'green'
    },
    {
        id: 32,
        color: "green",
        name: "NORTH CAROLINA AVENUE",
        price: 3,
        type: 'object'
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
        type: 'object'
    },
    {
        id: 35,
        type: 'railroad',
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
        type: 'object'
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
        type: 'object'
    },
];

