import SaludoRouter from './SaludoRouter';
import HttpResponse from '../shared/HttpResponse';
import SaludoController from './SaludoController';
import SaludoService from './SaludoService';
import { environment, apiSaludo } from '../../server';

const httpResponse = new HttpResponse(environment === 'dev');
const service = new SaludoService(apiSaludo);
const controller = new SaludoController(httpResponse, service);

export default new SaludoRouter(controller).router;
