import { Router } from 'express';

import UsersRouter from './classes/UsersRouter';
import UsersController from './classes/UsersController';
import UsersService from './classes/UsersService';
import AuthSerice from './classes/AuthService';
import AuthMiddleware from './classes/AuthMiddleware';
import model from './classes/UsersModel';
import { usersSchema } from './classes/UsersSchema';
import SchemaValidatorMiddleware from '../shared/SchemaValidatorMiddleware';
import { jwtSecretKey, jwtSignOptions } from '../../server/Settings';
import httpResponse from '../shared/HttpResponse';

const { generateJwt, verifyJwt, comparePassword, encryptPassword } = new AuthSerice(jwtSecretKey, jwtSignOptions);
export const { checkSession } = new AuthMiddleware(httpResponse, verifyJwt);
const { schemaValidator } = new SchemaValidatorMiddleware(httpResponse);
const service = new UsersService({ model, comparePassword, encryptPassword });
const controller = new UsersController({ httpResponse, service, generateJwt });

// Module User Router
export default new UsersRouter({ router: Router(), controller, checkSession, schemaValidator, usersSchema }).router;
