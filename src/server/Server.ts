import type { Application, RequestHandler } from 'express';
import type { IServer, Environment, DatabaseHandler } from './types';
import type { Modules } from '../modules/types';

interface HttpServer {
  close: () => void;
  address: () => unknown;
}

interface Dependences {
  app: Application;
  port: number;
  environment: Environment;
  mongo: DatabaseHandler;
  middlewares: RequestHandler[];
  modules: Modules;
}

export default class Server implements IServer {
  readonly #app: Application;
  readonly #port: number;
  readonly #mongo: DatabaseHandler;
  readonly #environment: string;
  #httpServer: HttpServer;
  constructor({ app, port, environment, mongo, middlewares, modules }: Dependences) {
    this.#environment = environment;
    this.#app = app;
    this.#port = port;
    this.#mongo = mongo;
    // init
    this.#app.use(middlewares);
    this.#app.use(modules);
  }

  public run = async (): Promise<void> => {
    this.#httpServer = this.#app.listen(this.#port);
    const { port } = this.#httpServer.address() as { port: number };
    console.info(`\x1b[33m${this.#message()}\x1b[0m\nSERVER running on: http://localhost:${port}`);
    try {
      await this.#mongo.connect();
    } catch (error) {
      console.error(error);
    }
  };

  #message = (): string => {
    if (this.#environment === 'dev') return '👽 DEV MODE 👽';
    if (this.#environment === 'test') return '🕵️  TEST MODE 🪲';
    return '🔥 ON 🔥';
  };

  /**
   * test getters
  public get app(): Application | undefined {
    if (this.#environment !== 'test') return undefined;
    return this.#app;
  }

  public get httpServer(): HttpServer | undefined {
    if (this.#environment !== 'test') return undefined;
    return this.#httpServer;
  } */
}
