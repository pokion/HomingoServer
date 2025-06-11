import typia from 'typia';
import { GroupRequestRemove } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        const { groupId }: GroupRequestRemove = typia.assert<GroupRequestRemove>(req.body);
        
        res.status(200).json({ message: 'Group deleted.', data: await db.groups.remove(groupId) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Group remove error:', err);
        }
        if(err instanceof typia.TypeGuardError){
            res.status(400).json({ message: 'Invalid input structure.' });
            return;
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}