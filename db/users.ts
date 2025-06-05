import query from './connection.js';
import { User } from '../types/db';

async function add(email: string, name: string, password: string){
    return await query<User>('INSERT INTO users(email, name, password) VALUES(?,?,?)', [email, name, password]);
}

async function remove(id: string){
    return await query<User>('DELETE FROM users WHERE id=?', [id]);
}

async function findById(id: string){
    return await query<User>('SELECT * FROM users WHERE id=?', [id]);
}

async function findByEmail(email: string){
    return await query<User>('SELECT * FROM users WHERE email=?', [email]);
}

export default{
    add,
    remove,
    findById,
    findByEmail
}