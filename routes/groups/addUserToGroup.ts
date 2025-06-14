import typia from 'typia';
import { GroupAddUserRequest } from '../../types/apiRequest.js';
import db from './../../db/index.js';
import { Request, Response } from 'express';
import { jwtCustomPayloadRes } from '../../types/apiResponse.js';

export default async (req: Request, res: Response) =>{
    try{
        const { inviteCode }: GroupAddUserRequest = typia.assert<GroupAddUserRequest>(req.body);
        
        res.status(200).json({ message: 'User added to group.', data: await db.groups.addUser(((req as any).user as jwtCustomPayloadRes).id, inviteCode) }); 
        
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Login error:', err);
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}