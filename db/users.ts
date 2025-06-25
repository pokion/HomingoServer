import { query } from './connection.js';
import { User, AllUserData } from '../types/db.js';
import { GroupRes, ListRes } from '../types/apiResponse.js';

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

async function getAllUserData(id: string){
    try{
        let allData = await query<AllUserData>(`
            SELECT 
                g.id AS groupId,
                g.name AS groupName,
                l.id AS listId,
                l.name AS listName,
                l.category AS listCategory,
                i.id AS itemId,
                i.name AS itemName,
                i.dueTo,
                i.quantity,
                i.unit,
                i.expirationDate,
                i.isChecked
            FROM users u
            JOIN users_groups ug ON u.id = ug.userId
            JOIN groups g ON ug.groupId = g.id
            JOIN lists l ON g.id = l.groupId
            LEFT JOIN items i ON l.id = i.listId
            WHERE u.id = ?;    
        `, [id]);

        const groupMap = new Map();

        for(const row of allData) {
            if(!groupMap.has(row.groupId)) {
                groupMap.set(row.groupId, {
                    id: row.groupId,
                    name: row.groupName,
                    lists: []
                });
            }

            const group = groupMap.get(row.groupId);

            let list = group.lists.find((l: { id: number; }) => l.id === row.listId);
            if(!list) {
                list = {
                    id: row.listId,
                    name: row.listName,
                    category: row.listCategory,
                    items: []
                };
                group.lists.push(list);
            }

            if(row.itemId) {
                list.items.push({
                    id: row.itemId,
                    name: row.itemName,
                    quantity: row.quantity,
                    unit: row.unit,
                    expirationDate: row.expirationDate,
                    isChecked: !!row.isChecked
                });
            }
        }

        return Array.from(groupMap.values());
    }catch(err){
        throw err;
    }
}

export default{
    add,
    remove,
    findById,
    findByEmail,
    getAllUserData
}