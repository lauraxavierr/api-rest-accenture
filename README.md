npm i nodemon -D -> responsável por atualizar o server a cada vez que salvo o projeto. (Amb Dev)

npm i nodemon -> responsável por colocar o projeto em produção.

 "build": "sucrase ./src -d ./build --transforms imports",
    "dev": "nodemon src/server.js"

npm run dev -> inicia o projeto.


instalações:
axios;
sucrase; -> pega em um formato e converte para a versão do navegador.

"build": "sucrase ./src -d ./build --transforms imports", -> cria "builders" para os projetos.

Sequelize -> conexão com ORM
Sequelize cli -> para passar instruções

Pacotes para utilizar o banco de dados:
* npm i 
* npm i sequelize-cli -D
* npm i sequelize
* npm install pg --save
* npm i pg-hstore //Instala o drive do postgree
* npm i yup
* npm i date-fns

Conectando ao banco de dados:
* yarn sequelize migration:create --name=users_accenture // Cria o banco
* yarn sequelize db:migrate                   // Executa o banco 

Utilizamos https://www.md5hashgenerator.com/ para gerar um token -> CODIFICAR.

https://jwt.io/ decodificar esse token.

Criar Bearer no postman.

Um deploy da integração foi realizado no Heroku.
https://dashboard.heroku.com/terms-of-service

* Criação de arquivo -> ProcFile

Comandos:
* npm run build start
* rm -rf build  //Apagar um arquivo

Após isso, configurar o projeto no Heroku e conectar com o GitHub.