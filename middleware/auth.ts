import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtCustomPayloadReq } from "../types/apiRequest";

if(!process.env.JWT_SECRET){
    throw Error('JsonWebToken secret is undefined');
}

const JWT_SECRET = process.env.JWT_SECRET;

export default async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token
        if(!token){
            res.status(401).json({ message: 'Invalid token.' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as jwtCustomPayloadReq;
        (req as any).user = decoded;

        next();
    }catch(err){
        if(process.env.NODE_ENV !== 'production'){
            console.error('Auth error:', err);
        }
    
        res.status(401).json({ message: 'Invalid token.' });
    }
}