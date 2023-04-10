import type { Router, RequestHandler } from 'express';
import type NotesController from './NotesController';
import type { AnyZodObject } from 'zod';
import type { NotesSchema } from './NotesSchema';
import type { Rol } from '../../users/types';

interface Dependences {
  router: Router;
  controller: NotesController;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  notesSchema: NotesSchema;
}

export default class NotesRouter {
  readonly #router: Router;
  constructor({ router, controller, checkSession, schemaValidator, notesSchema }: Dependences) {
    const { getNote, getNotes, postNote, putNote, deleteNote, testReturn204 } = controller;
    const { getNoteSchema, getNotesSchema, createNoteSchema, putNoteSchema, deleteNoteSchema } = notesSchema;

    this.#router = router;

    this.#router
      // Protected Routes by middleware
      .use('/notes', checkSession('user'))

      .get('/notes/:_id', schemaValidator(getNoteSchema), getNote)
      .get('/notes', schemaValidator(getNotesSchema), getNotes)
      .post('/notes', schemaValidator(createNoteSchema), postNote)
      .put('/notes/:_id', schemaValidator(putNoteSchema), putNote)
      .delete('/notes/:_id', schemaValidator(deleteNoteSchema), deleteNote)

      // test enpoint
      .get('/notes/test', testReturn204);
  }

  get router(): Router {
    return this.#router;
  }
}
