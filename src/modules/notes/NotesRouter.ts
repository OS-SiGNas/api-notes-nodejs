import { Router } from 'express';

import type NotesController from './NotesController';
import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { NotesSchema } from './NotesSchema';
import type { Rol } from '../users/types';
interface Dependences {
  notesController: NotesController;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  notesSchema: NotesSchema;
}

export default class NotesRouter {
  readonly #router: Router;
  constructor({ notesController, checkSession, schemaValidator, notesSchema }: Dependences) {
    const { getNote, getNotes, postNote, putNote, deleteNote, testReturn200 } = notesController;
    const { getNoteSchema, getNotesSchema, createNoteSchema, putNoteSchema, deleteNoteSchema } = notesSchema;

    this.#router = Router();

    this.#router
      // Protected Routes by middleware
      .use('/notes', checkSession('user'))
      .get('/notes/test', testReturn200)

      .get('/notes/:_id', schemaValidator(getNoteSchema), getNote)
      .get('/notes', schemaValidator(getNotesSchema), getNotes)
      .post('/notes', schemaValidator(createNoteSchema), postNote)
      .put('/notes/:_id', schemaValidator(putNoteSchema), putNote)
      .delete('/notes/:_id', schemaValidator(deleteNoteSchema), deleteNote);
  }

  get router(): Router {
    return this.#router;
  }
}
