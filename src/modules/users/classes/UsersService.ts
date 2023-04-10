import type UsersModel from './UsersModel';
import type { SearchOneUserParams, IUserService, IUser, SearchAllUsersParams } from '../types';

interface Dependences {
  model: typeof UsersModel;
  comparePassword: (password: string, userMatchedPassword: string) => Promise<boolean>;
  encryptPassword: (password: string) => Promise<string>;
}

export default class UsersService implements IUserService {
  readonly #model: typeof UsersModel;
  readonly #comparePassword: (password: string, userMatchedPassword: string) => Promise<boolean>;
  readonly #encryptPassword: (password: string) => Promise<string>;
  constructor({ model, comparePassword, encryptPassword }: Dependences) {
    this.#model = model;
    this.#comparePassword = comparePassword;
    this.#encryptPassword = encryptPassword;
  }

  public checkUserAndPassword = async (username: string, password: string): Promise<IUser | null> => {
    const userMatched = await this.getOneUser({ username });
    if (userMatched === null) return null;
    const equals = await this.#comparePassword(password, userMatched.password);
    if (!equals) return null;
    return userMatched;
  };

  public getOneUser = async (search: SearchOneUserParams): Promise<IUser | null> => {
    return await this.#model.findOne({ ...search });
  };

  public getAllUsers = async (search: SearchAllUsersParams): Promise<IUser[]> => {
    return await this.#model.find({ ...search });
  };

  public createUser = async (user: IUser): Promise<IUser> => {
    const encryptedPassword = await this.#encryptPassword(user.password);
    const newUser = new this.#model({ ...user, password: encryptedPassword });
    return await newUser.save();
  };

  public updateUserById = async (_id: string, user: IUser): Promise<IUser | null> => {
    if (user.password !== undefined) {
      user.password = await this.#encryptPassword(user.password);
    }
    return await this.#model.findByIdAndUpdate(_id, user, { new: true });
  };

  public deleteUserById = async (_id: string): Promise<IUser | null> => {
    return await this.#model.findByIdAndDelete(_id);
  };
}
