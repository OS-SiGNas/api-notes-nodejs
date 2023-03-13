import SaludoRouter from './SaludoRouter';
import HttpResponse from '../shared/HttpResponse';
import SaludoController from './SaludoController';
import SaludoService from './SaludoService';
import { config } from '../../server/config';

const httpResponse = new HttpResponse(config.environment === 'dev');
const service = new SaludoService(config.apiSaludo);
const controller = new SaludoController(httpResponse, service);

export default new SaludoRouter(controller).router;
