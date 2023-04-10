import { sign, verify } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';

import type { SignOptions } from 'jsonwebtoken';
import type { Rol, Payload, IAuthService } from '../types';

export default class AuthSerice implements IAuthService {
  readonly #secretKey: string;
  readonly #options: SignOptions;
  constructor(secretKey: string, options: SignOptions) {
    this.#secretKey = secretKey;
    this.#options = options;
  }

  public generateJwt = (userId: string, roles: Rol[]): string => {
    return sign({ userId, roles }, this.#secretKey, this.#options);
  };

  public verifyJwt = (token: string): Payload => {
    //                    ->                          Payload type extends JwtPayload
    const payload = verify(token, this.#secretKey) as Payload | string;
    if (typeof payload === 'string') throw new Error('Verify token failed');
    return payload;
  };

  public encryptPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
  };

  public comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await compare(password, receivedPassword);
  };
}
