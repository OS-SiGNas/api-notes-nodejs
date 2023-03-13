import { server } from './server';

import type { IServer } from './server/types';

(function (server: IServer) {
  void server.run();
})(server);

/*  If environment is different than 'test'
    server.app will return undefined
*/
export default server.app;
