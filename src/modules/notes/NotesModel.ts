import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import type { INote } from './types';

export class Note implements INote {
  @prop({ auto: true })
  _id: Types.ObjectId;

  @prop({ required: true })
  title: string;

  @prop({ required: false })
  description: string;

  @prop({ required: true })
  content: string;

  @prop({ auto: true, required: true })
  createAt: Date;

  @prop({ required: true })
  authorId: Types.ObjectId;
}

export const NotesModel = getModelForClass(Note);
