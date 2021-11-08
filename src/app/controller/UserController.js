import * as Yup from 'yup';

import User from '../models/User'


class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
      telefone: Yup.string().required()
    });

    // Verifica se o json foi passado corretamente no endpoint
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

    // Verifica no banco de dados se esse e-mail pertence a algum usuário
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

    var ultimo_login = valuesDB.user.ultimo_login
    const updateValues = await User.update({
      ultimo_login: ultimo_login.toUTCString()
    }, {
      where: {
        id: valuesDB.user.id
      }
    });

    if (checkValues) {
      return res.json(valuesDB),
        updateValues
    };

  };

  async index(req, res) {
    const authToken = req.headers.authorization;
    const [, token] = authToken.split(' '); //Remove o Bearer

    const checkValues = await User.findOne({
      where: {
        id: req.params.user_id
      }
    });

    const checkToken = await User.findOne({
      where: {
        token: token,
        id: req.params.user_id
      }
    });

    // Verifica se o token ou usuário são divergentes
    if (!checkToken || !checkValues) {
      return res.status(401).json({
        message: 'Não autorizado'
      })
    };

    // Verifica se o token e usuários estão divergentes dos valores no DB.
    if (!checkValues && !checkToken) {
      return res.status(401).json({
        message: 'Não autorizado'
      })
    };

    if (checkValues && checkToken) {
      var dtExpiresLogin = checkToken['dataValues']['expira_login'];

      var dateNow = new Date();
      dateNow.setHours(dateNow.getHours());

      if (dtExpiresLogin < dateNow) {
        return res.status(401).json({
          message: 'Sessão Inválida'
        })
      } else {
        return res.json({
          user: {
            id: checkToken['dataValues']['id'],
            nome: checkToken['dataValues']['nome'],
            email: checkToken['dataValues']['email'],
            senha: checkToken['dataValues']['senha'],
            telefone: checkToken['dataValues']['telefone'],
            data_criacao: checkToken['dataValues']['createdAt'],
            data_atualizacao: checkToken['dataValues']['updatedAt'],
            ultimo_login: checkToken['dataValues']['ultimo_login']
          }
        });
      };
    }

  };
}

export default new UserController();