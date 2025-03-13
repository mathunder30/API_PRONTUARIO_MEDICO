CREATE database prontuario_medico;

USE prontuario_medico;

CREATE table if not exists medico (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crm VARCHAR(20) UNIQUE NOT NULL, 
    especialidade VARCHAR(50),
    telefone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    senha varchar(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS paciente (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_paciente VARCHAR(255),
    data_paciente DATE NOT NULL,
    idade_paciente int not null,
    genero_paciente varchar (100),
    cpf_paciente varchar (11),
    telefone_paciente varchar(20),
    endereco_paciente varchar(255)
    
    );
 
 
    
CREATE TABLE IF NOT EXISTS historico_medico(
	id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id int,
	motivo_consulta varchar(550),
    diagnostico varchar(550),
    sintomas varchar(550),
    foreign key (paciente_id) references paciente(id) on delete cascade
);

CREATE TABLE IF NOT EXISTS medicacao(
	id int auto_increment primary key,
    paciente_id int,
    medicamentos varchar(255),
    instrucoes varchar(255),
    dosagem varchar(50),
    frequencia varchar(50),
    foreign key (paciente_id) references paciente(id) on delete cascade
   
);

CREATE TABLE IF NOT EXISTS observacoes (
	id int auto_increment primary key,
    paciente_id int,
    observacoes_medicas varchar(500),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (paciente_id) references paciente(id) on delete cascade
);

create table if not exists procedimentos (
	id int auto_increment primary key,
    paciente_id int,
    nome_procedimento varchar(255) not null,
    data_procedimento date not null,
    observacoes_procedimento text,
	foreign key (paciente_id) references paciente(id) on delete cascade
);

select * from paciente;
select * from medicacao;
select * from observacoes;
select * from medico;
