import type { NotesModel } from './NotesModel';
import type { INote, INotesService, FindNotesParams, GetNoteParams } from './types';

export default class NotesService implements INotesService {
  readonly #model: typeof NotesModel;
  constructor(model: typeof NotesModel) {
    this.#model = model;
  }

  getNoteById = async ({ _id, authorId }: GetNoteParams): Promise<INote | null> => {
    return await this.#model.findOne({ _id, authorId });
  };

  findAllNotes = async (toFind: FindNotesParams): Promise<INote[]> => {
    return await this.#model.find(toFind);
  };

  createNote = async (note: INote): Promise<INote> => {
    const newNote = new this.#model({ ...note, createAt: new Date() });
    return await newNote.save();
  };

  updateNoteById = async ({ _id, authorId }: GetNoteParams, note: INote): Promise<INote | null> => {
    return await this.#model.findOneAndUpdate({ _id, authorId }, note, { new: true });
  };

  deleteNoteById = async ({ _id, authorId }: GetNoteParams): Promise<INote | null> => {
    return await this.#model.findOneAndDelete({ _id, authorId });
  };
}
