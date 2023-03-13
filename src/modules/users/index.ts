import UsersRouter from './UsersRouter';
import UsersController from './UsersController';
import UsersService from './UsersService';
import AuthSerice from './AuthService';
import UsersMiddleware from './UsersMiddleware';
import ValidatorMiddleware from '../shared/SchemaValidatorMiddleware';

import { config } from '../../server/config';
import { UsersModel } from './UsersModel';
import { usersSchema } from './UsersSchema';
import HttpResponse from '../shared/HttpResponse';

const httpResponse = new HttpResponse(config.environment === 'dev');
const service = new UsersService(UsersModel);
const { generateJwt, verifyJwt } = new AuthSerice(config.jwtSecretKey);
const controller = new UsersController({ httpResponse, service, generateJwt });
const { checkSession } = new UsersMiddleware({ httpResponse, verifyJwt });
const { schemaValidator } = new ValidatorMiddleware(httpResponse);

// Module User
export default new UsersRouter({ controller, checkSession, schemaValidator, usersSchema }).router;