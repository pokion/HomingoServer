import typia, { tags } from 'typia';
import { jwtCustomPayloadRes } from './apiResponse';
import { JwtPayload } from 'jsonwebtoken';
import { Category } from './db';

export interface UserRequestRegister{
    email: string & tags.Format<"email"> & tags.MaxLength<200>;
    name: string & tags.MaxLength<100> & tags.MinLength<5>;
    password: string & tags.MaxLength<100> & tags.MinLength<8> & tags.Format<'password'>;
}

export interface UserRequestLogin{
    email: string & tags.Format<"email"> & tags.MaxLength<200>;
    password: string & tags.MaxLength<100> & tags.MinLength<8> & tags.Format<'password'>;
}

export interface jwtCustomPayloadReq extends jwtCustomPayloadRes, JwtPayload{}

export interface GroupRequestCreate{
    name: string & tags.MinLength<1> & tags.MaxLength<100>;
    userId: number
}

export interface ListRequestCreate{
    name: string & tags.MinLength<1> & tags.MaxLength<100>;
    category: Category;
    groupId: number;
}