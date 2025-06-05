import { transaction } from './connection.js';
import { Groups } from '../types/db';
import { ResultSetHeader } from 'mysql2';

async function add(groupName: string, userId: number){
    try{
        const group = await transaction<number, Groups>(
            async (conn) => {
                const [resultHeader] = await conn.execute<ResultSetHeader>('INSERT INTO groups(name) VALUES(?)', [groupName]);
                await conn.execute('INSERT INTO usersgroups(userId, groupId, isOwner) VALUES(?,?,?)', [userId, resultHeader.insertId, true]);
                return resultHeader.insertId;
            },
            async (conn, data) => {
                const [rows] = await conn.execute<Groups[]>('SELECT * FROM groups WHERE id=?', [data]);
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