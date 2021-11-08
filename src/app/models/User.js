import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init({
			nome: Sequelize.STRING,
			email: Sequelize.STRING,
			password: Sequelize.VIRTUAL,
			senha: Sequelize.STRING,
			telefone: Sequelize.STRING,
			token: Sequelize.STRING,
			ultimo_login: Sequelize.STRING,
			expira_login: Sequelize.STRING
		}, 
		{
			sequelize,
		});
		this.addHook('beforeSave', async user => {
			user.password = user.senha
			user.senha = await bcrypt.hash(user.password, 10)
		})

		return this;
	}
	checkPassword(password){
    		return bcrypt.compare(password, this.senha)
  	}

}

export default User;