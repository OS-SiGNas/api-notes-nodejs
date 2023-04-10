import type NotesModel from './NotesModel';
import type { INote, INotesService, GetNoteParams, FindNotesParams, NotesResponse } from '../types';

export default class NotesService implements INotesService {
  readonly #model: typeof NotesModel;
  constructor(model: typeof NotesModel) {
    this.#model = model;
  }

  /**
   * Get notes with findOne mongoose method
   * @param authorId is optional but necesary for normal 'user' Rol */
  getNoteById = async ({ _id, authorId }: GetNoteParams): Promise<INote | null> => {
    return await this.#model.findOne({ _id, authorId });
  };

  /**
   * Get all notes with find mongoose method
   * value authorId in the object is optional but necesary for normal 'user' Rol */
  findAllNotes = async ({ offset = 1, limit = 10, authorId }: FindNotesParams): Promise<NotesResponse> => {
    if (typeof limit === 'string') limit = +limit;
    if (typeof offset === 'string') offset = +offset;
    const total = await this.#model.count({ authorId });
    const pagination = { offset, limit, total };
    const notes = await this.#model
      .find({ authorId })
      .limit(limit)
      .skip((offset - 1) * limit);
    return { pagination, notes };
  };

  count = async (authorId: string): Promise<number> => {
    return await this.#model.count({ authorId });
  };

  createNote = async (note: INote): Promise<INote> => {
    const newNote = new this.#model({ ...note, createAt: new Date() });
    return await newNote.save();
  };

  /**
   * Update note with findOneAndUpdate mongoose method
   * @param authorId is optional but necesary for normal 'user' Rol */
  updateNoteById = async ({ _id, authorId }: GetNoteParams, note: INote): Promise<INote | null> => {
    return await this.#model.findOneAndUpdate({ _id, authorId }, note, { new: true });
  };

  /**
   * Delete note with findOneAndDelete mongoose method
   * @param authorId is optional but necesary for normal 'user' Rol */
  deleteNoteById = async ({ _id, authorId }: GetNoteParams): Promise<INote | null> => {
    return await this.#model.findOneAndDelete({ _id, authorId });
  };
}
