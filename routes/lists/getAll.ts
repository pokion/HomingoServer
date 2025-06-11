import typia from 'typia';
import { ListRequestGet } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        const { groupId }: ListRequestGet = typia.assert<ListRequestGet>(req.body);
        
        res.status(200).json({ message: 'Lists found.', data: await db.lists.getAll(groupId) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Lists error:', err);
        }
        if(err instanceof typia.TypeGuardError){
            res.status(400).json({ message: 'Invalid input structure.' });
            return;
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}