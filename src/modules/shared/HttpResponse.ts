import type { Response } from 'express';

export default class HttpResponse {
  readonly #OK: number = 200;
  readonly #CREATED: number = 201;
  readonly #BAD_REQUEST: number = 400;
  readonly #NOT_FOUND: number = 404;
  readonly #UNAUTHORIZED: number = 401;
  readonly #FORBIDDEN: number = 403;
  readonly #INTERNAL_SERVER_ERROR: number = 500;
  readonly #debug: boolean;
  constructor(debug: boolean) {
    this.#debug = debug;
  }

  #logger = (data: unknown): void => {
    if (this.#debug && data !== undefined) {
      console.log('======================  🕵️ logger  ======================');
      console.log(data);
      console.log('====================== end logger ======================');
    }
  };

  ok = (res: Response, data?: unknown): Response => {
    this.#logger(data);
    return res.status(this.#OK).json({
      status: this.#OK,
      statusMsg: 'Success 👌',
      data,
    });
  };

  created = (res: Response, data?: unknown): Response => {
    this.#logger(data);
    return res.status(this.#CREATED).json({
      status: this.#CREATED,
      statusMsg: 'Created 👌',
      data,
    });
  };

  badRequest = (res: Response, error?: unknown): Response => {
    this.#logger(error);
    return res.status(this.#BAD_REQUEST).json({
      status: this.#BAD_REQUEST,
      statusMsg: 'Bad Request 🤦',
      error,
    });
  };

  notFound = (res: Response, error?: unknown): Response => {
    this.#logger(error);
    return res.status(this.#NOT_FOUND).json({
      status: this.#NOT_FOUND,
      statusMsg: 'Resourse Not Found 😕',
      error,
    });
  };

  unauthorized = (res: Response, error?: unknown): Response => {
    this.#logger(error);
    return res.status(this.#UNAUTHORIZED).json({
      status: this.#UNAUTHORIZED,
      statusMsg: 'Unauthorized 🤖🔒',
      error,
    });
  };

  forbidden = (res: Response, error?: unknown): Response => {
    this.#logger(error);
    return res.status(this.#FORBIDDEN).json({
      status: this.#FORBIDDEN,
      statusMsg: '🔒 Forbidden 🔒',
      error,
    });
  };

  error = (res: Response, error?: any): Response => {
    this.#logger(error);
    if (typeof error.status === 'number' || typeof error.statusCode === 'number') {
      res.status(error.status ?? error.statusCode);
      return res.json({
        status: res.status,
        errorType: error?.name,
        errorMsg: error?.message,
      });
    } else {
      res.status(this.#INTERNAL_SERVER_ERROR);
      return res.json({
        status: res.status,
        errorMsg: 'Internal Server Error 🚑',
        errorType: error?.name,
      });
    }
  };
}
