import { sign, verify } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';

import type { SignOptions } from 'jsonwebtoken';
import type { Rol, Payload, IAuthService } from '../types';

export default function AuthService(secretKey: string, options: SignOptions): IAuthService {

    const generateJwt = (userId: string, roles: Rol[]): string => {
        return sign({ userId, roles }, secretKey, options);
    }

    const verifyJwt = (token: string): Payload => {
        //                    ->                          Payload type extends JwtPayload
        const payload = verify(token, secretKey) as Payload | string;
        if (typeof payload === 'string') throw new Error('Verify token failed');
        return payload;
    }

    const encryptPassword = async (password: string): Promise<string> => {
        const salt = await genSalt(10);
        return await hash(password, salt);
    };

    const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
        return await compare(password, receivedPassword);
    };

    return { generateJwt, verifyJwt, encryptPassword, comparePassword }
}