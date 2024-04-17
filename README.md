# Boas vindas ao repositório do projeto _Oldsmith_

<details>
  <summary><strong>O que foi desenvolvido:</strong></summary>

- Neste projeto, foi desenvolvido uma loja de itens medievais, feitos sob encomenda para pessoas específicas;
- Esta loja foi desenvolvida no formato de uma _API_, utilizando _Typescript_ e _Sequelize_;
- O projeto foi desenvolvido utilizando _JWT_ para autenticar algumas rotas, além de testes para garantir o correto funcionamento delas;
- A aplicação possui _endpoints_ que dão suporte às operações de criação, leitura e atualização de informações.

</details>

## Orientações

<details>
  <summary><strong>Execução dos testes</strong></summary>

- Para executar os testes localmente utilize o comando:

  ```bash
  npm run test:local
  ```

- Para verificar a cobertura de testes utilize o comando:

  ```bash
  npm run test:coverage
  ```

</details>

</details>

## Endpoint de cadastro de produtos

- O endpoint é acessível no caminho `POST /products`;
- Os produtos são salvos na tabela `products`;
- O corpo da requisição possui a seguinte estrutura:

  ```json
  {
    "name": "Martelo de Thor",
    "price": "30 peças de ouro",
    "userId": 1
  }
  ```

<details>
  <summary>O que foi desenvolvido:</summary>

- **[É possível cadastrar um produto com sucesso]**

  - Ao cadastrar um produto com sucesso retorna um _status http_ `201`:

  ```json
  {
    "id": 6,
    "name": "Martelo de Thor",
    "price": "30 peças de ouro",
    "userId": 1
  }
  ```

- **[O endpoint possui testes para as camadas `Service` e `Controller`.]**

</details>

---

## Endpoint para listar produtos

- O endpoint é acessível no caminho `GET /products`;

<details>
  <summary>O que foi desenvolvido:</summary>

- **[É possível listar todos os produtos com sucesso]**

  - Ao listar os produtos com sucesso retorna um _status http_ `200`:

  ```json
  [
    {
      "id": 1,
      "name": "Excalibur",
      "price": "10 peças de ouro",
      "userId": 1
    },
    {
      "id": 2,
      "name": "Espada Justiceira",
      "price": "20 peças de ouro",
      "userId": 1
    },
    // {...}
  ]
  ```

- **[O endpoint possui testes para as camadas `Service` e `Controller`.]**

</details>

---

## Endpoint para listar todos os usuários

- O endpoint é acessível no caminho `GET /users`;
- Essa rota retorna o nome de todos os usuários e os `ids` dos seus respectivos produtos.

<details>
  <summary>O que foi desenvolvido:</summary>

- **[É possível listar todos os usuários com sucesso]**

  - Ao listar os usuários com sucesso retorna um _status http_ `200`:

  ```json
  [
      {
        "username": "Hagar",
        "productIds": [1, 2],
      },
      {
        "username": "Eddie",
        "productIds": [3, 4],
      },
      {
        "username": "Helga",
        "productIds": [5],
      }
  ]
  ```

- **[O endpoint possui testes para as camadas `Service` e `Controller`.]**

</details>

---

## Endpoint para o login de usuários

- O endpoint deve ser acessível no caminho `POST /login`;
- A rota recebe os campos `username` e `password`;
- Gera um token `JWT` ao realizar um _login_ com sucesso;
- O corpo da requisição possui a seguinte estrutura:

```json
{
  "username": "string",
  "password": "string"
}
```

<details>
 <summary>O que foi desenvolvido:</summary>

- **[Validações dos campos "username" e "password"]**

  - Caso não receba o campo "username" ou "password", retorna um _status http_ `400` e a seguinte mensagem de erro:

  ```json
  { "message": "\"username\" and \"password\" are required" }
  ```

- **[Não é possível fazer login com um "username" inválido]**

  - Caso o "username" não esteja cadastrado no banco de dados retorna um _status http_ `401` e a seguinte mensagem de erro:

  ```json
  { "message": "Username or password invalid" }
  ```

- **[Não é possível fazer login com uma senha incorreta]**

  - Caso o "password" esteja incorreto no banco de dados retorna um _status http_ `401` e a seguinte mensagem de erro:

  ```json
  { "message": "Username or password invalid" }
  ```

- **[É possível fazer login com sucesso]**

  - Caso as informações estejam corretas, retorna um _status http_ `200` e um _token_ em um formato parecido com o formado abaixo:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY4Njc1NDc1Nn0.jqAuJkcLp0RuvrOd4xKxtj_lm3Z3-73gQQ9IVmwE5gA"
  }

- **[O endpoint possui testes para as camadas `Service` e `Controller`.]**

</details>

## _Middlewares_ de validações dos produtos

<details>
  <summary>O que foi desenvolvido:</summary>

- **[Validações do campo "name"]**

  - Caso o campo `name` não seja informado, retorna um _status http_ `400` e o seguinte corpo:

  ```json
  { "message": "\"name\" is required" }
  ```

  - Caso o campo `name` não seja do tipo `string`, retorna um _status http_ `422` e o seguinte corpo:

  ```json
  { "message": "\"name\" must be a string" }
  ```

  - Caso o campo `name` tenha um tamanho menor que 2 caracteres, retorna um _status http_ `422` e o seguinte corpo:

  ```json
  { "message": "\"name\" length must be at least 3 characters long" }
  ```

- **[Validações do campo "price"]**

  - Caso o campo `price` não seja informado, retorna um _status http_ `400` e o seguinte corpo:

  ```json
  { "message": "\"price\" is required" }
  ```

  - Caso o campo `price` não seja do tipo `string`, retorna um _status http_ `422` e o seguinte corpo:

  ```json
  { "message": "\"price\" must be a string" }
  ```

  - Caso o campo `price` tenha um tamanho menor que 2 caracteres, retorna um _status http_ `422` e o seguinte corpo:

  ```json
  { "message": "\"price\" length must be at least 3 characters long" }
  ```

- **[Validações do campo "userId"]**

  - Caso o campo `userId` não for informado, o resultado retornado deverá ser um _status http_ `400` e

  ```json
  { "message": "\"userId\" is required" }
  ```

  - Caso o campo `userId` não seja do tipo `number`, retorna um _status http_ `422` e o seguinte corpo:

  ```json
  { "message": "\"userId\" must be a number" }
  ```

  - Caso o campo `userId` seja inválido, retorna um _status http_ `422` e o seguinte corpo:

  ```json
  { "message": "\"userId\" not found'" }
  ```

</details>
