# API Connect - RESTful API para Gerenciamento de Usuários

MVP (Produto Mínimo Viável) desenvolvido para a startup Connect por Jheyson Siqueira, focado no gerenciamento completo de usuários através de uma arquitetura RESTful performática, modular e desacoplada.

---

## Visão Geral do Projeto

A API Connect é uma solução back-end construída para centralizar e expor operações de CRUD (Create, Read, Update, Delete) de usuários. O projeto foi projetado seguindo o princípio de Separação de Responsabilidades (SoC), garantindo que rotas, regras de negócio e a camada de dados operem de forma totalmente independente e escalável.

---

## Tecnologias Utilizadas

- Node.js (v18+): Ambiente de execução JavaScript no servidor.
- Express.js (v4.19+): Microframework web flexível para roteamento e middlewares.
- CORS: Middleware para permitir requisições cross-origin do front-end.
- Dotenv: Gerenciamento seguro de variáveis de ambiente.
- Nodemon: Utilitário de desenvolvimento para reinicialização automática do servidor.

---

## Estrutura do Projeto

api-connect-jheyson-siqueira/
├── src/
│   ├── controllers/
│   │   └── userController.js  # Lógica de negócio e validações
│   ├── data/
│   │   └── usersData.js       # Camada de persistência em memória
│   ├── routes/
│   │   └── userRoutes.js      # Mapeamento de endpoints HTTP
│   └── server.js              # Ponto de entrada e middlewares globais
├── .env.example               # Exemplo de configuração de variáveis de ambiente
├── .gitignore                 # Arquivos e pastas ignorados pelo Git
├── package.json               # Manifesto do projeto e dependências
└── README.md                  # Documentação técnica do sistema

---

## Instruções de Instalação e Execução Local

### Pré-requisitos
- Node.js instalado na versão 18 ou superior.
- npm (gerenciador de pacotes padrão do Node.js).

### Passo a Passo

1. Clonar o Repositório:
git clone https://github.com/jheysonssiqueira/api-connect-jheyson-siqueira.git
cd api-connect-jheyson-siqueira

2. Instalar as Dependências:
npm install

3. Configurar as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto com base no arquivo .env.example:
PORT=3000
NODE_ENV=development

4. Executar a Aplicação:
- Modo de Desenvolvimento (com reload automático):
npm run dev

- Modo de Produção:
npm start

5. Acessar a API:
O servidor estará ativo em: http://localhost:3000

---

## Documentação dos Endpoints RESTful

| Método | Endpoint | Descrição | Status Sucesso | Status Erro |
| --- | --- | --- | --- | --- |
| GET | / | Health Check (Verificação de saúde da API) | 200 OK | - |
| GET | /users | Retorna a lista de todos os usuários | 200 OK | 500 Internal Error |
| GET | /users/:id | Busca um usuário pelo seu ID numérico | 200 OK | 400 Bad Request / 404 Not Found |
| POST | /users | Cadastra um novo usuário no sistema | 201 Created | 400 Bad Request / 409 Conflict |
| PUT | /users/:id | Atualiza dados de um usuário existente | 200 OK | 400 Bad Request / 404 Not Found |
| DELETE | /users/:id | Remove um usuário da base de dados | 200 OK | 400 Bad Request / 404 Not Found |

---

### Exemplos de Requisições e Respostas

1. Listar Usuários (GET /users)

Resposta (200 OK):
```json
{
  "status": "sucesso",
  "codigo": 200,
  "totalRegistros": 2,
  "dados": [
    {
      "id": 1,
      "nome": "Ana Silva",
      "email": "ana.silva@startup.com",
      "cargo": "Desenvolvedora Front-end",
      "ativo": true
    },
    {
      "id": 2,
      "nome": "Carlos Eduardo",
      "email": "carlos.eduardo@startup.com",
      "cargo": "Designer UX/UI",
      "ativo": true
    }
  ]
}
