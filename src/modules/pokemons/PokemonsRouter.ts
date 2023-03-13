import { Router } from 'express';

import type PokemonController from './PokemonsController';
import type { RequestHandler } from 'express';
import type { Rol } from '../users/types';
interface Dependences {
  controller: PokemonController;
  checkSession: (arg: Rol) => RequestHandler;
}

export default class PokemonRouter {
  #router: Router;
  constructor({ controller, checkSession }: Dependences) {
    const { getOne } = controller;

    this.#router = Router();
    this.#router.get(`/pokemon/:name`, checkSession('audit'), getOne);
  }

  get router(): Router {
    return this.#router;
  }
}
