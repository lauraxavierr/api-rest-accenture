import dotenv from 'dotenv';

dotenv.config();

module.exports = {
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
}