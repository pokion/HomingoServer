import typia from 'typia';
import { ItemRequestUpdate } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

const itemColumsName = new Set(['name', 'multimediaId', 'quantity', 'unit', 'expirationDate', 'isChecked', 'dueTo', 'listId']);

export default async (req: Request, res: Response) =>{
    try{
        const itemId: number = typia.assert<number>(Number(req.params.itemId));
        const item: ItemRequestUpdate = typia.assert<ItemRequestUpdate>(req.body);
        let columnsToUpdate = {};
        for(let column in item){
            if(itemColumsName.has(column)){
                //@ts-ignore TODO: nie wiem co jest błędem ale jakoś kiedyś naprawić póki co idziemy dalej
                columnsToUpdate[column] = item[column]
            }
        }
        
        res.status(200).json({ message: 'Item eupdated.', data: await db.items.update(itemId, columnsToUpdate) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Login error:', err);
        }
        if(err instanceof typia.TypeGuardError){
            res.status(400).json({ message: 'Invalid input structure.' });
            return;
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}