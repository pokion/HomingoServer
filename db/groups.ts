import { transaction, query } from './connection.js';
import { Group, List } from '../types/db.js';
import { ResultSetHeader } from 'mysql2';
import crypto from 'crypto';

async function add(groupName: string, userId: number){
    try{
        const group = await transaction<number, Group>(
            async (conn) => {
                let inviteCode = crypto.randomBytes(5).toString('hex');
                const [resultHeader] = await conn.execute<ResultSetHeader>('INSERT INTO groups(name, inviteCode) VALUES(?,?)', [groupName, inviteCode]);
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
            console.error('sql error:', err);
        }
        throw err;
    }
}

async function get(userId: number){
    return await query<Group>(`SELECT groups.id, groups.name, groups.icon, groups.inviteCode
                                FROM users_groups 
                                RIGHT JOIN groups ON groups.id = users_groups.groupId
                                WHERE users_groups.userId = ?`, [userId]);
}

async function remove(groupId: number){
    try{
        const group = await transaction<void>(
            async (conn) => {
                const [lists] = await conn.execute<List[]>('SELECT * FROM lists WHERE groupId = ?', [groupId]);
                let listsIds = [];
                for(let list of lists){
                    listsIds.push(list.id);
                }
                await conn.query('DELETE FROM items WHERE listId = (?)', [listsIds]);
                await conn.query('DELETE FROM lists WHERE id = (?)', [listsIds]);
                await conn.execute('DELETE FROM users_groups WHERE groupId = ?', [groupId]);
                await conn.execute('DELETE FROM groups WHERE id = ?', [groupId]);
            }
        )
        return group;
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('sql error:', err);
        }
        throw err;
    }
}

async function addUser(userId: number, inviteCode: string){
    try{
        const group = await transaction<Group[]>(
            async (conn) =>{
                const [groups] = await conn.query<Group[]>('SELECT * FROM groups WHERE inviteCode = ?', [inviteCode]);
                if(groups.length > 0){
                    await conn.query('INSERT INTO users_groups(userId, groupId, isOwner) VALUES(?,?,?)', [userId, groups[0].id, false])
                }else{
                    throw new Error('Group not found.')
                }
                return groups;
            }
        )
        return group;
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('sql error:', err);
        }
        throw err;
    }
}

export default{
    add,
    get,
    remove,
    addUser
}