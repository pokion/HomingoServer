import { query } from './connection.js';
import { Item } from '../types/db.js';
import { ItemRequestCreate } from '../types/apiRequest.js';

async function add(item: ItemRequestCreate){
    return await query<Item>(`
        INSERT INTO items(name, multimediaId, quantity, unit, expirationDate, isChecked, dueTo, listId) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [item.name, item.multimediaId, item.quantity, item.unit, item.expirationDate, item.isChecked, item.dueTo, item.listId]);
}

async function getAllItemsInList(listId: number){
    return await query<Item>(`SELECT * FROM items WHERE listId = ?`, [listId]);
}

async function remove(itemId: number){
    return await query<Item>(`DELETE FROM items WHERE id = ?`, [itemId]);
}

async function update(itemId: number, columsToUpdate: {[key: string]: any}){
    let stringUpdate = [];
    let values = [];
    for(let column in columsToUpdate){
        stringUpdate.push(` ${column} = ? `);
        values.push(columsToUpdate[column]);
    }

    return await query<Item>(`UPDATE items SET ${stringUpdate.join(',')} WHERE id = ?`, [...values ,itemId]);
}

export default{
    add,
    getAllItemsInList,
    remove,
    update
}