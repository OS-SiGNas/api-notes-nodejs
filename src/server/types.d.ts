export interface IServer {
  run: () => Promise<void>;
}

type Environment = 'dev' | 'test' | 'prod';
export interface ISettings {
  environment: Environment;
  port: number;
  dbUri: string;
  jwtSecretKey: string;
  apiSaludo: string;
  testUserData: { username: string; password: string } | undefined;
}

export interface DatabaseHandler {
  connect: () => Promise<void>;
}
