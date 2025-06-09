import { transaction } from './connection.js';
import { List } from '../types/db.js';
import { ResultSetHeader } from 'mysql2';

async function add(name: List['name'], category: List['category'], groupId: number){
    try{
        const group = await transaction<number, List>(
            async (conn) => {
                const [resultHeader] = await conn.execute<ResultSetHeader>('INSERT INTO lists(name, category) VALUES(?,?)', [name, category]);
                await conn.execute('INSERT INTO groups_lists(groupId, listId) VALUES(?,?)', [groupId, resultHeader.insertId]);
                return resultHeader.insertId;
            },
            async (conn, data) => {
                const [rows] = await conn.execute<List[]>('SELECT * FROM lists WHERE id=?', [data]);
                return rows;
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

export default{
    add,
}