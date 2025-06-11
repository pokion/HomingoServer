import typia from 'typia';
import { ItemRequestRemove } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        const { itemId }: ItemRequestRemove = typia.assert<ItemRequestRemove>(req.body);
        
        res.status(200).json({ message: 'List deleted.', data: await db.items.remove(itemId) }); 
        
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