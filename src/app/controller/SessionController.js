import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';
import { date } from 'yup/lib/locale';

class SessionController{
  async store(req, res){
    const { email, senha } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if(!user){
      return res.status(401).json({ message: 'Usuário e/ou senha inválidos'});
    };

    if(!(await user.checkPassword(senha))){
      return res.status(401).json({ message: 'Senha incorreta.'});
    };

    const { id, nome} = User.findOne({ where: { email: req.body.email }});
    const checkValues = await User.findOne({ where: { email: req.body.email }});

    var dateNow = new Date();
    dateNow.setHours(dateNow.getHours());

    var dateExpiresIn = new Date();
    dateExpiresIn.setHours(dateExpiresIn.getHours());


    var token = jwt.sign({id, nome,email}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
    })

    var expiresIn = dateExpiresIn;
    expiresIn.setMinutes(expiresIn.getMinutes() + 30);

    console.log('agora', dateNow)
    console.log('jaja', expiresIn)


    const updateValues = await User.update({token: token, ultimo_login: dateNow.toUTCString(), expira_login: expiresIn.toUTCString()},{
      where: {
        id: checkValues['dataValues']['id']}
    });

    if(checkValues) {
      updateValues
    };

    const valuesDB = {
      user: {
        id: checkValues['dataValues']['id'],
        nome: checkValues['dataValues']['nome'],
        email: checkValues['dataValues']['email'],
        senha: checkValues['dataValues']['senha'],
        telefone: checkValues['dataValues']['telefone'],
        data_criacao: checkValues['dataValues']['createdAt'],
        data_atualizacao: checkValues['dataValues']['updatedAt'],
        ultimo_login: dateNow,
        token: token
      }
    };
    if(valuesDB) {
      return res.json(valuesDB);
    };

  }
}


export default new SessionController();