export { Request } from 'express';

export interface IUser {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

interface IGetQueryString {
    limit: string;
    loginSubstring: string;
}

export interface IUserGetRequest extends Request {
    query: IGetQueryString;
}
