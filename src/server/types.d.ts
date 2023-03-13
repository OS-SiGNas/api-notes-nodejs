export interface IServer {
  run: () => Promise<void>;
}

export interface IConfig {
  environment: string;
  port: number;
  dbUri: string;
  jwtSecretKey: string;
  apiSaludo: string;
  testUserData: { username: string; password: string };
}

export interface DatabaseHandler {
  connect: () => Promise<void>;
}