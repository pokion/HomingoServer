import { JwtPayload } from 'jsonwebtoken';
import { Group, Item, List } from './db.js';

export interface ErrorResponse{
    message: string;
    error: any;
}

export interface messageResponse{
    message: string;
}

export interface jwtCustomPayloadRes extends JwtPayload{
    id: number;
    email: string;
}

export interface ListRes extends List{
    items: Item[];
}

export interface GroupRes extends Group{
    lists: ListRes[]
}