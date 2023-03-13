import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from './config';
import { mongo } from './mongo';
import modules from '../modules';

// types
import type { Application } from 'express';
import type { Modules } from '../modules/types';
import type { IServer, IConfig, DatabaseHandler } from './types';
interface Dependences {
  config: IConfig;
  mongo: DatabaseHandler;
  modules: Modules;
}

class Server implements IServer {
  readonly #app: Application;
  readonly #port: number;
  readonly #mongo: DatabaseHandler;
  readonly #environment: string;
  constructor({ config, mongo, modules }: Dependences) {
    this.#app = Express();
    this.#port = config.port;
    this.#mongo = mongo;
    this.#environment = config.environment;

    // init main method
    this.#init(modules);
  }

  #startGlobalMidlewares = (): void => {
    this.#app
      .use(this.#environment === 'dev' ? morgan('dev') : morgan('common'))
      .use(Express.json())
      .use(cors());
  };

  #init = (modules: Modules): void => {
    this.#startGlobalMidlewares();
    this.#app.use(modules);
  };

  public run = async (): Promise<void> => {
    this.#app.listen(this.#port, (): void => {
      const message = (): string => {
        if (this.#environment === 'dev') return '👽 DEV MODE 👽';
        if (this.#environment === 'test') return '🕵️  TEST MODE 🪲';
        return '🔥 ON 🔥';
      };
      console.info(`\x1b[33m${message()}\x1b[0m\nSERVER running on: http://localhost:${this.#port}`);
    });

    try {
      await this.#mongo.connect();
    } catch (error) {
      console.error(error);
    }
  };

  public get app(): Application | undefined {
    if (this.#environment === 'test') return this.#app;
    return undefined;
  }
} // <- end

export const server = new Server({ config, mongo, modules });