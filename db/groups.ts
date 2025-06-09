import { transaction } from './connection.js';
import { Group } from '../types/db.js';
import { ResultSetHeader } from 'mysql2';

async function add(groupName: string, userId: number){
    try{
        const group = await transaction<number, Group>(
            async (conn) => {
                const [resultHeader] = await conn.execute<ResultSetHeader>('INSERT INTO groups(name) VALUES(?)', [groupName]);
                await conn.execute('INSERT INTO users_groups(userId, groupId, isOwner) VALUES(?,?,?)', [userId, resultHeader.insertId, true]);
                return resultHeader.insertId;
            },
            async (conn, data) => {
                const [rows] = await conn.execute<Group[]>('SELECT * FROM groups WHERE id=?', [data]);
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