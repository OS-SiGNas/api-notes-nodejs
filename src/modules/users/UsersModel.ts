import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

import type { Rol, IUser } from './types';

export class User implements IUser {
  // =>
  @prop({ auto: true })
  _id: Types.ObjectId;

  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true, minlength: 8 })
  password: string;

  @prop({ required: true, trim: true, unique: true })
  email: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  telf: string;

  @prop({ required: true })
  active: boolean;

  @prop({ type: String, required: true, default: [] })
  roles: Types.Array<Rol>;

  public static encryptPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
  };

  public static comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await compare(password, receivedPassword);
  };
}

export const UsersModel = getModelForClass(User);
