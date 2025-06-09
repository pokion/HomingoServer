import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import db from './../../db/index.js';
import { Request, Response } from 'express';
import { UserRequestLogin } from '../../types/apiRequest.js';
import { ErrorResponse, jwtCustomPayloadRes, messageResponse } from '../../types/apiResponse.js';
import typia from "typia";

if(!process.env.JWT_SECRET){
    throw Error('JsonWebToken secret is undefined');
}

const JWT_SECRET = process.env.JWT_SECRET;

export default async (req: Request, res: Response<ErrorResponse | messageResponse>) =>{
    try{
        const { email, password }: UserRequestLogin = typia.assert<UserRequestLogin>(req.body);
        const user = (await db.users.findByEmail(email))?.[0];

        if(!user){
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }

        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email } as jwtCustomPayloadRes,
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24*60*60*1000
        })

        res.status(200).json({ message: 'User logged' })

    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Login error:', err);
        }
        if(err instanceof typia.TypeGuardError){
            res.status(400).json({ message: 'Invalid input structure.', error: err.message });
            return; 
        }

        res.status(500).json({ message: 'Internal server error.' });
    }
}