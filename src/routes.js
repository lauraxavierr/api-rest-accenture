import { Router }  from 'express'; //Extraindo um objeto da biblioteca Router do express
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/signup', UserController.store); //ESTÁ OK!!
routes.post('/signin', SessionController.store);
routes.post('/session', SessionController.store);

//Invocando arquivo middlewares
//routes.use(authMiddleware);

routes.get('/users/:user_id', authMiddleware, UserController.index)


//routes.put('/put', UserController.update);

//routes.post('/appointments', AppointmentsController.store);

export default routes;