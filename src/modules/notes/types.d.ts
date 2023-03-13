export interface INote {
  _id: Types.ObjectId;
  title: string;
  description: string;
  content: string;
  createAt: Date;
  authorId: Types.ObjectId;
}

export interface INotesService {
  getNoteById: (_id: string) => Promise<INote | null>;
  getNotesByAuthorId: ({ authorId, query }: { authorId: string; query?: string }) => Promise<INote[]>;
  createNote: (note: INote) => Promise<INote>;
  updateNoteById: (_id: string, note: INote) => Promise<INote | null>;
  deleteNoteById: (_id: string) => Promise<INote | null>;
}
