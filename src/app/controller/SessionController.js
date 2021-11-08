import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Yup from 'yup';

import User from '../models/User';

dotenv.config();
class SessionController{
	async store(req, res){
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			senha: Yup.string().required().min(6)
		});

		const { email, senha } = req.body;

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({
				message: 'Dados inválidos'
			});
		}

		const user = await User.findOne({
			where: { email }
		});

		// Verifica se o e-mail informado existe
		if(!user){
			return res.status(401).json({ message: 'Usuário e/ou senha inválidos'});
		}

		// Retorna o e-mail informado e verifica se a senha está incorreta
		if(!(await user.checkPassword(senha))){
			return res.status(401).json({ message: 'Usuário e/ou senha inválidos'});
		}

		const { id, nome} = User.findOne({ where: { email: req.body.email }});
		const checkValues = await User.findOne({ where: { email: req.body.email }});

		var dateNow = new Date();
		dateNow.setHours(dateNow.getHours());

		var dateExpiresIn = new Date();
		dateExpiresIn.setHours(dateExpiresIn.getHours());

		var token = jwt.sign({id, nome,email}, process.env.SECRET, {
			expiresIn: process.env.EXPIRESIN,
		});

		var expiresIn = dateExpiresIn;
		expiresIn.setMinutes(expiresIn.getMinutes() + 30);


		const updateValues = await User.update({token: token, data_atualizacao: dateNow.toUTCString(), ultimo_login: dateNow.toUTCString(), expira_login: expiresIn.toUTCString()},{
			where: {
				id: checkValues['dataValues']['id']}
		});

		if(checkValues) {
			updateValues;
		}

		const valuesDB = {
			user: {
				id: checkValues['dataValues']['id'],
				nome: checkValues['dataValues']['nome'],
				email: checkValues['dataValues']['email'],
				senha: checkValues['dataValues']['senha'],
				telefone: checkValues['dataValues']['telefone'],
				data_criacao: checkValues['dataValues']['createdAt'],
				data_atualizacao: dateNow,
				ultimo_login: dateNow,
				token: token
			}
		};
		if(valuesDB) {
			return res.json(valuesDB);
		}

	}
}


export default new SessionController();