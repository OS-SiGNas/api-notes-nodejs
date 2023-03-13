import dotenv from 'dotenv';
import type { IConfig } from './types';

dotenv.config();

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGO_URI_HEADER,
  MONGO_PASS,
  MONGO_CLUSTER,
  API_SALUDO,
  USER_TEST_USERNAME,
  USER_TEST_PASSWORD,
} = process.env;

class Config implements IConfig {
  readonly #environment: string | undefined;
  readonly #port: string | undefined;
  readonly #mongoUriHeader: string | undefined;
  readonly #mongoPass: string | undefined;
  readonly #mongoCluster: string | undefined;
  readonly #secretKey: string | undefined;
  readonly #apiSaludo: string | undefined;
  readonly #usernameTestUser: string | undefined;
  readonly #passwordTestUser: string | undefined;
  constructor() {
    // console.log('===============config===============')
    this.#environment = NODE_ENV;
    this.#port = PORT;
    this.#mongoUriHeader = MONGO_URI_HEADER;
    this.#mongoPass = MONGO_PASS;
    this.#mongoCluster = MONGO_CLUSTER;
    this.#secretKey = JWT_SECRET;
    this.#apiSaludo = API_SALUDO;
    this.#usernameTestUser = USER_TEST_USERNAME;
    this.#passwordTestUser = USER_TEST_PASSWORD;
  }

  get environment(): string {
    if (this.#environment === undefined) throw new Error('NODE_ENV is undefined');
    return this.#environment;
  }

  get port(): number {
    if (this.#port === undefined) return 3000;
    return +this.#port;
  }

  get dbUri(): string {
    if (this.#mongoUriHeader === undefined) throw new Error('undefined MONGO_URI_HEADER in .env');
    if (this.#mongoPass === undefined) throw new Error('undefined MONGO_PASS in .env');
    if (this.#mongoCluster === undefined) throw new Error('undefined MONGO_CLUSTER in .env');
    return `${this.#mongoUriHeader}${this.#mongoPass}${this.#mongoCluster}`;
  }

  get jwtSecretKey(): string {
    if (this.#secretKey === undefined) throw new Error('undefined JWT_SECRET in .env');
    return this.#secretKey;
  }

  get apiSaludo(): string {
    if (this.#apiSaludo === undefined) throw new Error('undefined API_SALUDO in .env');
    return this.#apiSaludo;
  }

  get testUserData(): { username: string; password: string } {
    if (this.#environment !== 'test') throw new Error('testUserData is only available in test mode');
    if (this.#usernameTestUser === undefined) throw new Error('undefined USER_TEST_USERNAME in .env');
    if (this.#passwordTestUser === undefined) throw new Error('undefined USER_TEST_PASSWORD in .env');
    return {
      username: this.#usernameTestUser,
      password: this.#passwordTestUser,
    };
  }
}

export const config = new Config();