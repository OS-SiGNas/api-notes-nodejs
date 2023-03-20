import type { Environment, ISettings } from './types';

export default class Settings implements ISettings {
  readonly #environment: string | undefined;
  readonly #port: string | undefined;
  readonly #mongoUriHeader: string | undefined;
  readonly #mongoCluster: string | undefined;
  readonly #secretKey: string | undefined;
  readonly #apiSaludo: string | undefined;
  readonly #usernameTestUser: string | undefined;
  readonly #passwordTestUser: string | undefined;
  constructor(env: NodeJS.ProcessEnv) {
    this.#environment = env.NODE_ENV;
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
    if (this.#environment === 'dev') return 'dev';
    if (this.#environment === 'test') return 'test';
    if (this.#environment === 'prod') return 'prod';
    throw new Error('only values dev|test|prod in NODE_ENV');
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
    if (this.#secretKey === undefined) throw new Error('undefined JWT_SECRET key in .env');
    return this.#secretKey;
  }

  get apiSaludo(): string {
    if (this.#apiSaludo === undefined) throw new Error('undefined API_SALUDO in .env');
    return this.#apiSaludo;
  }

  get testUserData(): { username: string; password: string } | undefined {
    if (this.#environment !== 'test') return undefined;
    if (this.#usernameTestUser === undefined) throw new Error('undefined USER_TEST_USERNAME in .env');
    if (this.#passwordTestUser === undefined) throw new Error('undefined USER_TEST_PASSWORD in .env');
    return {
      username: this.#usernameTestUser,
      password: this.#passwordTestUser,
    };
  }
}
