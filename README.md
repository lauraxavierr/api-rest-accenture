# API RESTful Sign in/Sign up

## Sumário
1. [Introdução](#Introdução)
2. [Instalação](#Instalação)
3. [Rotas](#Rotas)
4. [Teste](#Test)

## Introdução

O objetivo dessa aplicação é expor uma API RESTful de sign up/sign in.

Este projeto foi criado para o processo seletivo na Accenture.


Pacotes principais:
- Express para criação das rotas e inicio dos server.
- JWT para persistência do token por 30 minutos.
- Elephantsql para utilização do banco de dados NoSQL (MongoDB)
- Eslint para realização de testes unitários.

## Instalação

Deve-se configurar as variável de ambiente .env

Exemplo: 

```
SECRET=XXXX
EXPIRESIN='30m'
```

Deve-se instalar as dependência utilizando:
```
npm install ou npm i
```

Para iniciar aplicação: 
```
npm run dev
```

## Rotas/Endpoints

### Sign up
POST http://localhost:5000/signup


```java
{
   "nome": "Laura Xavier",
   "email": "lauraxavier@teste.com.br",
   "senha": "123456",
   "telefone": "985789987"
}
```

Exemplo de retorno com status 200
```java
{
"user": {
    "id": 1,
    "nome": "Laura Xavier",
    "email": "lauraxavier@teste.com.br",
    "senha": "$2a$10$mMSoaR65d/eZRP9HkD/5PeQdC9BxXYoAUFVP/KzGELj6uaasfghj",
    "telefone": "985789987",
    "data_criacao": "2021-11-08T19:43:02.861Z",
    "data_atualizacao": "2021-11-08T19:43:02.861Z",
    "ultimo_login": "2021-11-08T19:43:02.861Z"
    }
}
```

Exemplo de retorno com status 401
```java
{
    "message": "E-mail já existente"
}
```
-----

### Sign in
POST http://localhost:5000/signin

```java
{
   "email": "lauraxavier@teste.com.br",
   "senha": "123456"
}
```

Exemplo de retorno com status 200
```java
{
{
"user": {
    "id": 1,
    "nome": "Laura Xavier",
    "email": "lauraxavier@teste.com.br",
    "senha": "$2a$10$mMSoaR65d/eZRP9HkD/5PeQdC9BxXYoAUFVP/KzGELj6uaasfghj",
    "telefone": "985789987",
    "data_criacao": "2021-11-08T19:43:02.861Z",
    "data_atualizacao": "2021-11-08T19:46:07.690Z",
    "ultimo_login": "2021-11-08T19:46:07.690Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMTA0MjE3MkB0ZXN0ZUFnZW5kYW1lbnRvLmNvbS5iciIsImlhdCI6MTYzNjQwMDc2NywiZXhwIjoxNjM2NDg3MTY3fQ.NFBnKNJB2xuqMJLlADJ1pkN2saSqbzDe5RKtkKIcl5e"
    }
}
}
```

Exemplo de retorno com status 401
```java
{
    "message": "Usuário e/ou senha inválidos"
}
```
-----

### Buscar Usuário
GET http://localhost:5000/users/:user_id

Exemplo
```java

"http://localhost:5000/users/:1"

```

**Observação:** será necessário preencher o user_id com o usuário do cliente que deseja obter as informações.
Também será preciso passar no header o parâmento authentication, utilizando a opção Token Bearer.
O user_id e token foram retornados na rota de sign-in. 


Exemplo de retorno com status 200
```java
{
"user": {
    "id": 1,
    "nome": "Laura Xavier",
    "email": "lauraxavier@teste.com.br",
    "senha": "$2a$10$mMSoaR65d/eZRP9HkD/5PeQdC9BxXYoAUFVP/KzGELj6uaasfghj",
    "telefone": "985789987",
    "data_criacao": "2021-11-08T19:43:02.861Z",
    "data_atualizacao": "2021-11-08T19:46:07.690Z",
    "ultimo_login": "2021-11-08T19:46:07.690Z"
    }
}
```

Exemplo de retorno com status 401
```java
{
    "message": "Não autorizado"
}
```

Caso o token esteja expirado
```java
{
    "message": "Sessão inválida"
}
```


## Test

