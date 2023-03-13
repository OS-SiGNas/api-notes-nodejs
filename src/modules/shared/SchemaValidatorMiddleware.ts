import { ZodError } from 'zod';

import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type HttpResponse from './HttpResponse';
import type { AnyZodObject } from 'zod';

export default class ValidatorMiddleware {
  #response: HttpResponse;
  constructor(httpResponse: HttpResponse) {
    this.#response = httpResponse;
  }

  schemaValidator = (schema: AnyZodObject): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse({ body: req.body, params: req.params, query: req.query });
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errors = error.issues.map((issues) => ({
            errorType: issues.code,
            message: issues.message,
            path: issues.path,
          }));
          this.#response.badRequest(res, errors);
        } else {
          this.#response.error(res, error);
        }
      }
    };
  };
}
