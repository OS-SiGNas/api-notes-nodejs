export interface INote {
  _id: Types.ObjectId;
  title: string;
  description: string;
  content: string;
  createAt: Date;
  authorId: Types.ObjectId;
}

export interface GetNoteParams {
  _id: string;
  authorId?: string;
}

export interface FindNotesParams {
  authorId?: string;
  query?: string;
}

export interface INotesService {
  getNoteById: (arg: GetNoteParams) => Promise<INote | null>;
  findAllNotes: (arg: FindNotesParams) => Promise<INote[]>;
  createNote: (note: INote) => Promise<INote>;
  updateNoteById: (arg: GetNoteParams, note: INote) => Promise<INote | null>;
  deleteNoteById: (arg: GetNoteParams) => Promise<INote | null>;
}
