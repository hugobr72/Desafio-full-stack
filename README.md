# Instruções para Rodar o Aplicativo

Este é um guia rápido sobre como rodar o aplicativo localmente em seu ambiente de desenvolvimento.

## 1. Criar o Banco de Dados

Antes de iniciar o aplicativo, é necessário criar o banco de dados. Você pode fazer isso executando os seguintes comandos em seu sistema de gerenciamento de banco de dados (por exemplo, PostgreSQL):

```sql
CREATE TABLE clientes (
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255)  NOT NULL,
  telefone VARCHAR(20),
  id SERIAL PRIMARY KEY
);

ALTER TABLE clientes
ADD COLUMN x INT,
ADD COLUMN y INT;


## 2. Iniciar o Back-end
Antes de iniciar o aplicativo, é necessário instalar as dependências:

```Back-end
cd Back-end
  npm install
  npm start

## 2. Iniciar o Front-end
Antes de iniciar o aplicativo, é necessário instalar as dependências:

```Front-end
cd Front-end
  npm install
  npm run dev