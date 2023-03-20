import PokemonRouter from './PokemonsRouter';
import PokemonController from './PokemonsController';
import PokemonService from './PokemonsService';
import HttpResponse from '../shared/HttpResponse';
import { environment, jwtSecretKey } from '../../server';
import UsersMiddleware from '../users/UsersMiddleware';
import AuthSerice from '../users/AuthService';

const httpResponse = new HttpResponse(environment === 'dev');
const { verifyJwt } = new AuthSerice(jwtSecretKey);
const service = new PokemonService();
const controller = new PokemonController({ httpResponse, service });
const { checkSession } = new UsersMiddleware({ httpResponse, verifyJwt });

export default new PokemonRouter({ controller, checkSession }).router;
