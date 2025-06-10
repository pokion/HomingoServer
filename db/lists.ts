import { query } from './connection.js';
import { List } from '../types/db.js';
import { ResultSetHeader } from 'mysql2';

async function add(name: List['name'], category: List['category'], groupId: number){
    return await query<List>('INSERT INTO lists(name, category, groupId) VALUES(?,?,?)', [name, category, groupId]);
}

export default{
    add,
}