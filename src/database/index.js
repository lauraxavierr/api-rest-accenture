import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import User from '../app/models/User';


dotenv.config();

const models = [User];

class Database {
	constructor() {
		this.init();
	}


	init() {
		this.connection = new Sequelize({
			dialect: 'postgres',
			host: process.env.HOST,
			username: process.env.DATABASE,
			password: process.env.PASSWORD,
			database: process.env.DATABASE,
			define: {
				timeStamps: true,
				underscored: true,
				underscoredAll: true
			}
		});

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));

	}
}

export default new Database();