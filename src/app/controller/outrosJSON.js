import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController{
  async store(req, res){
    const { email, senha } = req.body;

    const user = await User.findOne({
      where: { email }
    });


    if(!user){
      return res.status(401).json({ message: 'Usuário e/ou senha inválidos'});
    };

    console.log('AQUI', await user.checkPassword(senha))
    if(!(await user.checkPassword(senha))){
      return res.status(401).json({ message: 'Senha Usuário e/ou senha inválidos'});
    };

    const checkValues = await User.findOne({ where: { email: email }});
    if(checkValues) {
      return res.json({
      user: {
        id: checkValues['dataValues']['id'],
        nome: checkValues['dataValues']['nome'],
        email: checkValues['dataValues']['email'],
        senha: checkValues['dataValues']['senha'],
        telefone: checkValues['dataValues']['telefone'],
        data_criacao: checkValues['dataValues']['createdAt'],
        data_atualizacao: checkValues['dataValues']['updatedAt'],
      },
      token: jwt.sign({ id, nome, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
  }


    
  }
}

export default new SessionController();