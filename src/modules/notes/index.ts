import NotesRouter from './NotesRouter';
import NotesController from './NotesController';

import UsersMiddleware from '../users/UsersMiddleware';
import AuthSerice from '../users/AuthService';
import { notesSchema } from './NotesSchema';
import HttpResponse from '../shared/HttpResponse';
import { environment, jwtSecretKey } from '../../server';
import ValidatorMiddleware from '../shared/SchemaValidatorMiddleware';
import NotesService from './NotesService';
import { NotesModel } from './NotesModel';

const httpResponse = new HttpResponse(environment === 'dev');
const service = new NotesService(NotesModel);
const notesController = new NotesController(httpResponse, service);
const { verifyJwt } = new AuthSerice(jwtSecretKey);
const { checkSession } = new UsersMiddleware({ httpResponse, verifyJwt });
const { schemaValidator } = new ValidatorMiddleware(httpResponse);

export default new NotesRouter({ notesController, checkSession, schemaValidator, notesSchema }).router;
