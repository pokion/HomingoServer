import db from './../../db/index.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) =>{
    try{
        
        res.status(200).json({ message: 'All data.', data: await db.users.getAllUserData((req as any).user.id) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Get all user data error:', err);
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}