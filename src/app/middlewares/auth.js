import verify from 'jsonwebtoken/verify';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res, next) => {
	const authToken = req.headers.authorization;

	if(!authToken){
		return res.status(401).json({ message: 'Usuário não logado'});
	}

	const [ , token ] = authToken.split(' '); //Remove o Bearer

	try {
		verify(token, process.env.SECRET);
		return next();
    
	} catch (err) {
		return res.status(401).json({ message: 'Não autorizado'});
	}

};