import verify from 'jsonwebtoken/verify';


import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).json({ message: 'Usuário não logado'})
  }

  const [ , token ] = authToken.split(' '); //Remove o Bearer

  try {
    verify(token, authConfig.secret)
    return next();
    
  } catch (err) {
    return res.status(401).json({ message: 'Não autorizado'});
  }

}