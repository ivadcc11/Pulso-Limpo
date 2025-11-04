CREATE DATABASE pulso_limpo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE pulso_limpo;

CREATE TABLE solicitacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  idade INT NOT NULL,
  substancia VARCHAR(50) NOT NULL,
  tempo_uso VARCHAR(50) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  urgencia VARCHAR(50) NOT NULL,
  mensagem TEXT,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
