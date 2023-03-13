import { sign, verify } from 'jsonwebtoken';

import type { IUser, Payload } from './types';

export default class AuthSerice {
  readonly #secretKey: string;
  constructor(secretKey: string) {
    this.#secretKey = secretKey;
  }

  generateJwt = (user: IUser): string => {
    const { _id, roles } = user;
    const payload = { _id, roles };
    const token = sign(payload, this.#secretKey, { expiresIn: 3600 });
    return token;
  };

  verifyJwt = (token: string): Payload => {
    //                    ->                          Payload type extends JwtPayload
    const payload = verify(token, this.#secretKey) as Payload | string;
    if (typeof payload === 'string') throw new Error('Verify token failed');
    return payload;
  };
}
