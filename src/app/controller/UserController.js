import * as Yup from 'yup';
import jwt from 'jsonwebtoken';


import User from '../models/User'
import authConfig from '../../config/auth';
import { getMinutes } from 'date-fns';


class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
      telefone: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: 'Dados inválidos'
      })
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userExists) {
      return res.status(401).json({
        message: 'E-mail já existente'
      })
    };

    const { id, nome, email } = await User.create(req.body);
    const checkValues = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours());

    const valuesDB = {
      user: {
        id: checkValues['dataValues']['id'],
        nome: checkValues['dataValues']['nome'],
        email: checkValues['dataValues']['email'],
        senha: checkValues['dataValues']['senha'],
        telefone: checkValues['dataValues']['telefone'],
        data_criacao: checkValues['dataValues']['createdAt'],
        data_atualizacao: checkValues['dataValues']['updatedAt'],
        ultimo_login: checkValues['dataValues']['createdAt']
      }
    }
    console.log('VALORES', valuesDB.user.ultimo_login)

    // const dateNow = new Date();
    // dateNow.setHours(dateNow.getHours());

    var ultimo_login = valuesDB.user.ultimo_login
    const updateValues = await User.update({ultimo_login: ultimo_login.toUTCString()},{
       where: {
         id: valuesDB.user.id}
       });

    // if(checkValues) {
    //   return res.json(valuesDB),
    //   updateValues
    // };

    if(checkValues) {
      return res.json(valuesDB),
      updateValues
    };

  };

  async index(req, res) {
    const authToken = req.headers.authorization;

    const [ , token ] = authToken.split(' '); //Remove o Bearer

    const checkValues = await User.findOne({
      where: {
        id: req.params.user_id
      }
    });

    const checkToken = await User.findOne({
      where: {
        token: token
      }
    });

    // Caso o token não exista
    if (!checkToken) {
      return res.status(401).json({
        message: 'Não autorizado'
      })
    };

    if (!checkValues && !checkToken) {
      return res.status(401).json({
        message: 'Não autorizado'
      })
    };


    if (checkValues && checkToken) {
      var dbLogin = checkValues['dataValues']['updatedAt'];
      var dbMaxLogin = checkValues['dataValues']['expira_login'];

      var dateNow = new Date();
      dateNow.setHours(dateNow.getHours());

      var dtNowTrat = dateNow.toUTCString()

      if (dtNowTrat > dbMaxLogin){
        console.log('DATA TRATADA ', dtNowTrat)
        console.log('DATA AGORA', dbMaxLogin)
        return res.status(401).json({
        message: 'Sessão Inválida'
      })
      /home/lauraxiz/Documentos/Cursos/LuizaCodeNodeJS (cópia)/src/app/controller/UserController.js
      } else {
      return res.json({
        user: {
          id: checkValues['dataValues']['id'],
          nome: checkValues['dataValues']['nome'],
          email: checkValues['dataValues']['email'],
          senha: checkValues['dataValues']['senha'],
          telefone: checkValues['dataValues']['telefone'],
          data_criacao: checkValues['dataValues']['createdAt'],
          data_atualizacao: checkValues['dataValues']['updatedAt'],
        }
      });
    };
  }

  };
}

export default new UserController();