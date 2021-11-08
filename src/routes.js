import { Router }  from 'express'; //Extraindo um objeto da biblioteca Router do express
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/signup', UserController.store); 

routes.post('/signin', SessionController.store);

routes.get('/users/:user_id', authMiddleware, UserController.index);


export default routes;