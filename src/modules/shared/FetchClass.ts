type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface RequestParams {
  method: Method;
  endpoint: string;
  body?: object;
}

export default class Fetch {
  readonly #url: string;
  #token: string;
  /**
   * @constructs
   * @param url -> http://mydomain.com
   * @param token -> Bearer token */
  constructor(url?: string, token?: string) {
    this.#url = url ?? '';
    this.#token = token ?? '';
  }

  /**
   * use .get<MyInterfaceResponse>(endpoint) for types
   * @param endpoint -> like "/route" */
  public get = async <T>(endpoint: string): Promise<T> => {
    return await this.#request<T>({ method: 'GET', endpoint });
  };

  /**
   * use .get<MyInterfaceResponse>(endpoint, body) for types
   * @param endpoint -> "/route" */
  public post = async <T>(endpoint: string, body: object): Promise<T> => {
    return await this.#request<T>({ method: 'POST', endpoint, body });
  };

  /**
   * use .get<MyInterfaceResponse>(endpoint, body) for types
   * @param endpoint -> "/route" */
  public put = async <T>(endpoint: string, body: object): Promise<T> => {
    return await this.#request<T>({ method: 'PUT', endpoint, body });
  };

  /**
   * use .get<MyInterfaceResponse>(endpoint) for types
   * @param endpoint -> "/route" */
  public del = async (endpoint: string): Promise<boolean> => {
    return await this.#request({ method: 'DELETE', endpoint });
  };

  readonly #request = async <T>({ method, endpoint, body }: RequestParams): Promise<T> => {
    const response = await global.fetch(`${this.#url}${endpoint}`, this.#options({ method, body }));
    return await response.json();
  };

  readonly #options = ({ method, body }: { method?: Method; body?: object }): object => {
    return {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#token}`,
      },
      body: JSON.stringify(body),
    };
  };

  get token(): string {
    return this.#token;
  }

  /**
   * Set your Bearer token */
  set token(token: string) {
    this.#token = token;
  }
}
