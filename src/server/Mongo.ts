import type { Mongoose } from 'mongoose';
import type { DatabaseHandler, Environment } from './types';

export default class Mongo implements DatabaseHandler {
  readonly #uri: string;
  readonly #mongoose: Mongoose;
  constructor(mongoose: Mongoose, uri: string, environment: Environment) {
    this.#mongoose = mongoose;
    this.#uri = uri;
    if (environment === 'dev') this.#devEvents();
    this.#mongoose.connection.on('error', this.#logger('Connection error'));
  }

  public connect = async (): Promise<void> => {
    this.#mongoose.set('strictQuery', false);
    await this.#mongoose.connect(this.#uri);
  };

  #devEvents = (): void => {
    this.#mongoose.connection.on('connecting', this.#logger('Connecting to cluster'));
    this.#mongoose.connection.on('connected', this.#logger('Connected'));
    this.#mongoose.connection.on('reconnected', this.#logger('Reconnected'));
    this.#mongoose.connection.on('close', this.#logger('Connection closed'));
  };

  #logger = (message: string) => () => {
    console.log(`Mongo ==> ${message}`);
  };
}
