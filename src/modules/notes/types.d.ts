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
  offset?: number;
  limit?: number;
}

export interface NotesResponse {
  pagination: { limit: number; offset: number; total: number };
  notes: INote[];
}

export interface INotesService {
  getNoteById: (arg: GetNoteParams) => Promise<INote | null>;
  findAllNotes: (toFind: FindNotesParams) => Promise<NotesResponse>;
  count: (filter: string) => Promise<number>;
  createNote: (note: INote) => Promise<INote>;
  updateNoteById: (arg: GetNoteParams, note: INote) => Promise<INote | null>;
  deleteNoteById: (arg: GetNoteParams) => Promise<INote | null>;
}
