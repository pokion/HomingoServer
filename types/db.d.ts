import { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket{
    id: number;
    email: string;
    name: string | null;
    password: string;
    googleId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UsersGroups extends RowDataPacket{
    id: number;
    userId: number;
    groupId: number;
    isOwner: boolean;
}

export interface Groups extends RowDataPacket{
    id: number;
    name: string;
    icon: string | null;
}