import { Router } from 'express';
import type SaludoController from './SaludoController';

export default class SaludoRouter {
  #router: Router;
  constructor(controller: SaludoController) {
    const { saludar } = controller;

    this.#router = Router();
    this.#router.get('/saludo/:name', saludar);

    // this.router.post('/saludo', this.enseniar);
    // this.router.put('/saludo', this.aprender);
    // this.router.delete('/saludo', this.olvidar);
  }

  get router(): Router {
    return this.#router;
  }
}
