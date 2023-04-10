import dotenv from 'dotenv';

import type { SignOptions } from 'jsonwebtoken';
import type { Environment, ISettings } from './types';

dotenv.config();

class Settings implements ISettings {
  readonly #environment: Environment | undefined;
  readonly #port: string | undefined;
  readonly #mongoUriHeader: string | undefined;
  readonly #mongoCluster: string | undefined;
  readonly #secretKey: string | undefined;
  readonly #apiSaludo: string | undefined;
  readonly #usernameTestUser: string | undefined;
  readonly #passwordTestUser: string | undefined;
  constructor(env: NodeJS.ProcessEnv) {
    // console.log('===============config===============')
    this.#environment = env.NODE_ENV as Environment | undefined;
    this.#port = env.PORT;
    this.#mongoUriHeader = env.MONGO_URI_HEADER;
    this.#mongoCluster = env.MONGO_CLUSTER;
    this.#secretKey = env.JWT_SECRET;
    this.#apiSaludo = env.API_SALUDO;
    this.#usernameTestUser = env.USER_TEST_USERNAME;
    this.#passwordTestUser = env.USER_TEST_PASSWORD;
  }

  get environment(): Environment {
    if (this.#environment === undefined) throw new Error('NODE_ENV is undefined');
    return this.#environment;
  }

  get port(): number {
    if (this.#port === undefined) return 0;
    return +this.#port;
  }

  get dbUri(): string {
    if (this.#mongoUriHeader === undefined) throw new Error('undefined MONGO_URI_HEADER in .env');
    if (this.#mongoCluster === undefined) throw new Error('undefined MONGO_CLUSTER in .env');
    return `${this.#mongoUriHeader}${this.#mongoCluster}`;
  }

  get jwtSecretKey(): string {
    if (this.#secretKey === undefined) throw new Error('undefined JWT_SECRET in .env');
    return this.#secretKey;
  }

  get jwtSignOptions(): SignOptions {
    return {
      expiresIn: 3600,
    };
  }

  /**
   * any example api for test */
  get apiSaludo(): string {
    if (this.#apiSaludo === undefined) throw new Error('undefined API_SALUDO in .env');
    return this.#apiSaludo;
  }

  get testUserData(): { username: string; password: string } | undefined {
    // if (this.#environment !== 'test') throw new Error('testUserData is only available in test mode');
    if (this.#environment !== 'test') return undefined;
    if (this.#usernameTestUser === undefined) throw new Error('undefined USER_TEST_USERNAME in .env');
    if (this.#passwordTestUser === undefined) throw new Error('undefined USER_TEST_PASSWORD in .env');
    return {
      username: this.#usernameTestUser,
      password: this.#passwordTestUser,
    };
  }
}

export const { environment, port, dbUri, jwtSecretKey, jwtSignOptions, apiSaludo, testUserData } = new Settings(
  process.env
);
