import typia from 'typia';
import { GroupRequestCreate } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        const { name, userId }: GroupRequestCreate = typia.assert<GroupRequestCreate>(req.body);
        
        res.status(200).json({ message: 'Internal server error.', data: await db.groups.add(name, userId) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Login error:', err);
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}