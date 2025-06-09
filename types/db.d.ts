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
}

export interface GroupList extends RowDataPacket{
    id: number;
    groupId: number;
    listId: number;
}

export interface Item extends RowDataPacket{
    id: number;
    name: string;
    multimediaId: number | null;
    quantity: number | null;
    unit: Unit | null;
    expirationDate: date | null;
    isChecked: boolean;
    dueTo: date | null;
}

export interface list extends RowDataPacket{
    id: number;
    name: string;
    category: Category;
    icon: string | null;
}

export interface listItem extends RowDataPacket{
    id: number;
    listId: number;
    itemId: number;
}

export interface multimedia extends RowDataPacket{
    id: number;
    userId: number;
    path: string;
    createAt: date;
}