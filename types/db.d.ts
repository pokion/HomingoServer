import { RowDataPacket } from 'mysql2/promise';

export enum Unit{
    g = 'g',
    kg = 'kg',
    l = 'l',
    ml = 'ml',
    m = 'm',
    mm = 'mm'
}

export enum Category{
    Shopping = 'Shopping',
    Cleaning = 'Cleaning',
    Storage = 'Storage'
}

export interface User extends RowDataPacket{
    id: number;
    email: string;
    name: string | null;
    password: string;
    googleId: string | null;
    createdAt: Date;
}

export interface UsersGroup extends RowDataPacket{
    id: number;
    userId: number;
    groupId: number;
    isOwner: boolean;
}

export interface Group extends RowDataPacket{
    id: number;
    name: string;
    icon: string | null;
    inviteCode: string;
}

export interface Item extends RowDataPacket{
    id: number | null;
    name: string;
    multimediaId: number | null;
    quantity: number | null;
    unit: Unit | null;
    expirationDate: date | null;
    isChecked: boolean;
    dueTo: date | null;
    listId: number;
}

export interface List extends RowDataPacket{
    id: number;
    name: string;
    category: Category;
    icon: string | null;
    groupId: number;
}

export interface Multimedia extends RowDataPacket{
    id: number;
    userId: number;
    path: string;
    createAt: date;
}

export interface AllUserData extends RowDataPacket{
    groupId: number;
    groupName: string;
    listId: number;
    listName: string;
    listCategory: string;
    itemId: number;
    itemName: string;
    dueTo: date | null;
    quantity: number | null;
    unit: Unit | null;
    expirationDate: date | null;
    isChecked: boolean;
}