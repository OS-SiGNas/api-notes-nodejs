import type { NotesModel } from './NotesModel';
import type { INote, INotesService } from './types';

// interface GetNotesParams {
// authorId: string;
// title?: string;
// description?: string;
// content?: string;
// createAt?: Date;
// }

export default class NotesService implements INotesService {
  readonly #model: typeof NotesModel;
  constructor(model: typeof NotesModel) {
    this.#model = model;
  }

  getNoteById = async (_id: string): Promise<INote | null> => {
    return await this.#model.findById(_id);
  };

  getNotesByAuthorId = async (toFind: { authorId: string }): Promise<INote[]> => {
    return await this.#model.find(toFind);
  };

  createNote = async (note: INote): Promise<INote> => {
    const newNote = new this.#model({ ...note, createAt: new Date() });
    return await newNote.save();
  };

  updateNoteById = async (_id: string, note: INote): Promise<INote | null> => {
    return await this.#model.findByIdAndUpdate(_id, note, { new: true });
  };

  deleteNoteById = async (_id: string): Promise<INote | null> => {
    return await this.#model.findByIdAndDelete(_id);
  };
}
