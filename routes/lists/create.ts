import typia from 'typia';
import { ListRequestCreate } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        const { name, category, groupId }: ListRequestCreate = typia.assert<ListRequestCreate>(req.body);
        
        res.status(200).json({ message: 'Internal server error.', data: await db.lists.add(name, category, groupId) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Login error:', err);
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}