import typia from 'typia';
import db from './../../db/index.js';
import { Request, Response } from 'express';
import { jwtCustomPayloadRes } from '../../types/apiResponse.js';

export default async (req: Request, res: Response) =>{
    try{        

        res.status(200).json({ message: 'Items found.', data: await db.groups.get(((req as any).user as jwtCustomPayloadRes).id ) }); 
        
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