import typia from 'typia';
import { ItemRequestCreate } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        const reqBody: ItemRequestCreate = typia.assert<ItemRequestCreate>(req.body);
        
        res.status(200).json({ message: 'Item added.', data: await db.items.add(reqBody, reqBody.listId) }); 
        
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