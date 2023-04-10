import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import type { INote } from '../types';

class Note implements INote {
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

const NotesModel = getModelForClass(Note);
export default NotesModel;
