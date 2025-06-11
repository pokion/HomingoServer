import { query, transaction } from './connection.js';
import { List } from '../types/db.js';

async function add(name: List['name'], category: List['category'], groupId: number): Promise<List[]>{
    return await query<List>('INSERT INTO lists(name, category, groupId) VALUES(?,?,?)', [name, category, groupId]);
}

async function remove(listId: number): Promise<null>{
    try{
        const group = await transaction<void>(
            async (conn) => {
                await conn.execute('DELETE FROM items WHERE listId = ?', [listId]);
                await conn.execute('DELETE FROM lists WHERE id = ?', [listId]);
            }
        )
        return group;
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Login error:', err);
        }
        throw err;
    }
}

async function getAll(groupId: number){
    return await query<List>('SELECT * FROM lists WHERE groupId = ?', [groupId]);
}

export default{
    add,
    remove,
    getAll
}