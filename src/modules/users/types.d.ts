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
  roles: Array<Rol>;
}

export interface SearchOneUserParams {
  _id?: string;
  username?: string;
  email?: string;
  telf?: string;
}

export interface SearchAllUsersParams {
  name?: string;
  active?: string;
  rol?: Rol;
}

export interface IUserService {
  /** This method returns a single document according to the search parameters
   * @param search -> Uniques user keys like _id, username, email or telf */
  getOneUser: (search: SearchOneUserParams) => Promise<IUser | null>;
  /** This method returns a array documents according to the search parameters
   * @param search -> users keys like name, active, rol */
  getAllUsers: (search: SearchAllUsersParams) => Promise<IUser[]>;

  checkUserAndPassword: (username: string, password: string) => Promise<IUser | null>;
  createUser: (user: IUser) => Promise<IUser>;
  updateUserById: (_id: string, user: IUser) => Promise<IUser | null>;
  deleteUserById: (_id: string) => Promise<IUser | null>;
}

export interface Payload extends JwtPayload {
  username: string;
  roles: Rol[];
}

export interface IAuthService {
  generateJwt: (userId: string, roles: Rol[]) => string;
  verifyJwt: (token: string) => Payload;
  encryptPassword: (password: string) => Promise<string>;
  comparePassword: (password: string, receivedPassword: string) => Promise<boolean>;
}
