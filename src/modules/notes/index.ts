import { Router } from 'express';

import NotesRouter from './classes/NotesRouter';
import NotesController from './classes/NotesController';
import NotesService from './classes/NotesService';
import NotesModel from './classes/NotesModel';

import SchemaValidatorMiddleware from '../shared/SchemaValidatorMiddleware';
import { notesSchema } from './classes/NotesSchema';
import httpResponse from '../shared/HttpResponse';
import { checkSession } from '../users';

const { schemaValidator } = new SchemaValidatorMiddleware(httpResponse);

const service = new NotesService(NotesModel);
const controller = new NotesController(httpResponse, service);

// Module Notes Router
export default new NotesRouter({ router: Router(), controller, checkSession, schemaValidator, notesSchema }).router;
