import { Router } from 'express';

import type { Request, Response } from 'express';

class NotFound {
  router: Router;
  constructor() {
    this.router = Router();

    this.router
      .get('/', this.#noEndpoint)

      .get('*', this.#noEndpoint)
      .post('*', this.#noEndpoint)
      .put('*', this.#noEndpoint)
      .patch('*', this.#noEndpoint)
      .head('*', this.#noEndpoint)
      .delete('*', this.#noEndpoint)
      .options('*', this.#noEndpoint)

      .get('/404', this.#noEndpoint);
  }

  #noEndpoint = (_req: Request, res: Response): Response => {
    return res.sendStatus(404);
  };
}

export default new NotFound().router;
