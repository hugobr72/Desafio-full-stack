create TABLE clientes (
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255)  NOT NULL,
  telefone VARCHAR(20),
	id SERIAL PRIMARY KEY
);

ALTER TABLE clientes
ADD COLUMN x INT,
ADD COLUMN y INT;
