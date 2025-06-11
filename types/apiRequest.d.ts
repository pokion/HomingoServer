import typia, { tags } from 'typia';
import { jwtCustomPayloadRes } from './apiResponse';
import { JwtPayload } from 'jsonwebtoken';
import { Category, Unit } from './db';

export interface UserRequestRegister{
    email: string & tags.Format<"email"> & tags.MaxLength<200>;
    name: string & tags.MaxLength<100> & tags.MinLength<5>;
    password: string & tags.MaxLength<100> & tags.MinLength<8> & tags.Format<'password'>;
}

export interface UserRequestLogin{
    email: string & tags.Format<"email"> & tags.MaxLength<200>;
    password: string & tags.MaxLength<100> & tags.MinLength<8> & tags.Format<'password'>;
}

export interface jwtCustomPayloadReq extends jwtCustomPayloadRes{}

export interface GroupRequestCreate{
    name: string & tags.MinLength<1> & tags.MaxLength<100>;
    userId: number
}

export interface ListRequestCreate{
    name: string & tags.MinLength<1> & tags.MaxLength<100>;
    category: Category;
    groupId: number;
}

export interface ItemRequestCreate{
    name: string & tags.MinLength<1> & tags.MaxLength<100>;
    listId: number;
    multimediaId: number | null;
    quantity: number | null;
    unit: Unit | null;
    expirationDate: string & tags.Format<"date"> | null;
    isChecked: boolean | null;
    dueTo: string & tags.Format<"date"> | null;
}

export interface ItemRequestGet{
    listId: number;
}

export interface ItemRequestRemove{
    itemId: number;
}

export interface ListRequestGet{
    groupId: number;
}

export interface ListRequestRemove{
    groupId: number;
}

export interface GroupRequestRemove{
    groupId: number;
}