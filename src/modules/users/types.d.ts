import type { JwtPayload } from 'jsonwebtoken';

export type Rol = 'admin' | 'dev' | 'audit' | 'user';
export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  name: string;
  telf: string;
  active: boolean;
  roles: Types.Array<Rol>;
  //   encryptPassword: (password: string) => Promise<string>;
  //   comparePassword: (password: string, receivedPassword: string) => Promise<boolean>;
}

export interface IUserService {
  getUserbyUsername: (username: string) => Promise<IUser | null>;
  getUserById: (_id: string) => Promise<IUser | null>;
  getAllUsers: () => Promise<IUser[]>;
  createUser: (user: IUser) => Promise<IUser>;
  updateUserById: (_id: string, user: IUser) => Promise<IUser | null>;
  deleteUserById: (_id: string) => Promise<IUser | null>;
  checkUserAndPassword: (username: string, password: string) => Promise<IUser | null>;
}

export interface Payload extends JwtPayload {
  username: string;
  roles: Rol[];
}

