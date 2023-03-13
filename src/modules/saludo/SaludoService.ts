import fetch from 'node-fetch';

export default class SaludoService {
  #host: string;
  constructor(host: string) {
    this.#host = host;
  }

  getSaludo = async (name: string): Promise<Response> => {
    const responseSaludo = await fetch(`${this.#host}${name}`);
    const response = await responseSaludo.json();
    return response;
  };
}
