import express from 'express';
import routes  from './routes';
import './database'

class App {
    constructor(){
	this.server = express();
	this.middleware();
	this.routes();
    }

    //Mediação: recebe um valor e passa para outro projeto.
    middleware(){
	this.server.use(express.json());
    }

    routes(){
	this.server.use(routes);
    }
}

//Estou exportando o tudo o que está dentro da classe.
export default new App().server;
