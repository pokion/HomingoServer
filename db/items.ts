import { transaction } from './connection.js';
import { Item } from '../types/db.js';
import { ResultSetHeader } from 'mysql2';
import { ItemRequestCreate } from '../types/apiRequest.js';

async function add(item: ItemRequestCreate, listId: number){
    try{
        const group = await transaction<number, Item>(
            async (conn) => {
                const [resultHeader] = await conn.execute<ResultSetHeader>(`INSERT INTO items(name, multimediaId, quantity, unit, expirationDate, isChecked, dueTo) 
                    VALUES(?, ?, ?, ?, ?, ?, ?)`, [item.name, item.multimediaId, item.quantity, item.unit, item.expirationDate, item.isChecked, item.dueTo]);
                await conn.execute('INSERT INTO lists_items(listId, itemId) VALUES(?,?)', [listId, resultHeader.insertId]);
                return resultHeader.insertId;
            },
            async (conn, data) => {
                const [rows] = await conn.execute<Item[]>('SELECT * FROM items WHERE id=?', [data]);
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