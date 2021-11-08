'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ultimo_login: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expira_login: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },


  down: async queryInterface => {
    return queryInterface.dropTable('users');
  }
};
