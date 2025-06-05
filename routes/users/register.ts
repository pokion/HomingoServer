import bcrypt from 'bcryptjs';
import typia from 'typia';
import { Request, Response } from 'express';
import db from '../../db/index.js';
import { ErrorResponse, messageResponse } from '../../types/apiResponse';
import { UserRequestRegister } from '../../types/apiRequest';

export default async (req: Request, res: Response<ErrorResponse | messageResponse>) => {
    try{
        const { email, name, password }: UserRequestRegister = typia.assert<UserRequestRegister>(req.body);

        if (!/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password)) {
            res.status(400).json({ message: 'Password must contain uppercase, number and symbol.' });
            return;
        }

        const findUser = await db.users.findByEmail(email);

        if(findUser && findUser.length){
            res.status(409).json({ message: 'User already exists.' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const result = await db.users.add(email, name, hash);

        if(result){
            res.status(201).json({ message: 'User added' });
        }else{
            res.status(500).json({ message: 'Failed to add user' });
        }
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Register path error:', err);
        }
        if(err instanceof typia.TypeGuardError){
            res.status(400).json({ message: 'Invalid input structure.', error: err.message });
            return; 
        }

        res.status(500).json({ message: 'Internal problem.', error: err }); 
    }
}