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