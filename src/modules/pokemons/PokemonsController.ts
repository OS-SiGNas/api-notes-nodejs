import type { Request, Response } from 'express';
import type HttpResponse from '../shared/HttpResponse';
import type PokemonService from './PokemonsService';
interface Dependences {
  httpResponse: HttpResponse;
  service: PokemonService;
}

export default class PokemonController {
  #response: HttpResponse;
  #service: PokemonService;
  constructor({ httpResponse, service }: Dependences) {
    this.#response = httpResponse;
    this.#service = service;
  }

  getOne = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.params;
    try {
      const data = await this.#service.getPokemonByName(name);
      if (data === undefined) return this.#response.notFound(res);
      return this.#response.ok(res, data);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}
