CREATE database prontuario_medico;

USE prontuario_medico;
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
    paciente_id int not null,
	motivo_consulta varchar(550),
    diagnostico varchar(550),
    sintomas varchar(550),
    foreign key (paciente_id) references paciente(id) on delete cascade
);

CREATE TABLE IF NOT EXISTS medicacao(
	id int auto_increment primary key,
    paciente_id int not null,
    medicamentos varchar(255),
    instrucoes varchar(255),
    foreign key (paciente_id) references paciente(id) on delete cascade
);

CREATE TABLE IF NOT EXISTS observacoes (
	id int auto_increment primary key,
    paciente_id int not null,
    observacoes_medicas varchar(500),
    foreign key (paciente_id) references paciente(id) on delete cascade

);

