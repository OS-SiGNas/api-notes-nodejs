import UsersRouter from './UsersRouter';
import UsersController from './UsersController';
import UsersService from './UsersService';
import AuthSerice from './AuthService';
import UsersMiddleware from './UsersMiddleware';
import { UsersModel } from './UsersModel';
import { usersSchema } from './UsersSchema';
import ValidatorMiddleware from '../shared/SchemaValidatorMiddleware';
import HttpResponse from '../shared/HttpResponse';
import { environment, jwtSecretKey } from '../../server/';

const httpResponse = new HttpResponse(environment === 'dev');
const service = new UsersService(UsersModel);
const { generateJwt, verifyJwt } = new AuthSerice(jwtSecretKey);
const controller = new UsersController({ httpResponse, service, generateJwt });
const { checkSession } = new UsersMiddleware({ httpResponse, verifyJwt });
const { schemaValidator } = new ValidatorMiddleware(httpResponse);

// Module User
export default new UsersRouter({ controller, checkSession, schemaValidator, usersSchema }).router;

