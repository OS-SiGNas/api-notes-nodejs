import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { Rol, Payload } from './types';
import type HttpResponse from '../shared/HttpResponse';
interface Dependences {
  httpResponse: HttpResponse;
  verifyJwt: (token: string) => Payload;
}

export default class UsersMiddleware {
  readonly #response: HttpResponse;
  readonly #verifyJwt: (token: string) => Payload;
  constructor({ httpResponse, verifyJwt }: Dependences) {
    this.#response = httpResponse;
    this.#verifyJwt = verifyJwt;
  }

  checkSession = (rol: Rol): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): Response | undefined => {
      const { authorization } = req.headers;
      if (authorization === undefined) return this.#response.badRequest(res, 'Missing authorization headers');
      const token = authorization.split(' ').pop();
      try {
        const payload = this.#verifyJwt(String(token));
        if (payload.roles.includes(rol)) {
          req.headers.userId = payload._id;
          req.headers.userRoles = payload.roles;
          next();
          return undefined;
        } else {
          return this.#response.unauthorized(res, `Only ${rol} on this endpoint`);
        }
      } catch (error) {
        return this.#response.unauthorized(res, error);
      }
    };
  };
}

/* Payload:
  _id: string,
  roles: Rol[],
  iat: number,
  exp: number 

*/
