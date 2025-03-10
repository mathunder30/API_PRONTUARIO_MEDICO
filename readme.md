# 🏥 Sistema de Prontuário Médico

Este é um sistema de **Prontuário Médico** desenvolvido com **TypeScript, Node.js, Express e MySQL**. O objetivo é fornecer uma API REST para **gerenciar pacientes**, permitindo o cadastro de **medicamentos, observações médicas e procedimentos** associados a cada paciente.

---

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Para um código mais seguro e escalável
- **Node.js + Express** - Para criar a API REST
- **MySQL** - Banco de dados relacional para armazenar as informações dos pacientes
- **Sequelize** - ORM para facilitar a manipulação do banco de dados
- **Postman** - Para testar e documentar as requisições da API
- **Dotenv** - Para gerenciar variáveis de ambiente
- **Nodemon** - Para facilitar o desenvolvimento, reiniciando o servidor automaticamente em alterações

---

## ⚙️ Arquitetura do Projeto

O projeto segue uma estrutura organizada em **camadas** para facilitar a manutenção e escalabilidade:

📂 **src/**  
 ┣ 📂 **config/** → Configuração do banco de dados  
 ┣ 📂 **controllers/** → Contém os controladores das requisições  
 ┣ 📂 **models/** → Define as tabelas do banco de dados  
 ┣ 📂 **routes/** → Define todas as rotas da API  
 ┣ 📂 **services/** → Contém regras de negócio e interações com o banco  
 ┣ 📂 **middleware/** → Autenticação e validação de dados  
 ┣ 📂 **utils/** → Funções auxiliares  
 ┣ 📜 **server.ts** → Arquivo principal que inicializa a aplicação  

---

## 📌 Funcionalidades Implementadas

✅ **Gerenciamento de Pacientes**  
- Criar, listar, buscar por ID, atualizar e excluir pacientes  

✅ **Cadastro de Medicamentos**  
- Associar medicamentos a um paciente  
- Informar nome, dosagem e frequência  

✅ **Relacionamento no Banco de Dados**  
- Uso de **chaves estrangeiras (Foreign Keys)** para vincular pacientes aos medicamentos  

✅ **Middleware de Validação**  
- Verifica se os dados enviados na requisição estão corretos  

✅ **Documentação com Postman**  
- Todas as rotas são testadas e documentadas  

---

## 🗂 Estrutura do Banco de Dados

O banco de dados utiliza **relacionamentos entre tabelas** para vincular os pacientes com seus respectivos **medicamentos, observações médicas e procedimentos**.

### 📌 **Diagrama do Banco de Dados**

```plaintext
+--------------------+
|    pacientes      |
+--------------------+
| id (PK)           |
| nome              |
| data_nascimento   |
| genero            |
| cpf               |
| telefone          |
| endereco          |
+--------------------+
        |
        | 1:N
        |
+----------------------+
|    medicamentos      |
+----------------------+
| id (PK)             |
| paciente_id (FK)    |
| nome_medicamento    |
| dosagem            |
| frequencia         |
+----------------------+

+----------------------+
| observacoes_medicas  |
+----------------------+
| id (PK)             |
| paciente_id (FK)    |
| descricao          |
| data_registro     |
+----------------------+

+----------------------+
|    procedimentos     |
+----------------------+
| id (PK)             |
| paciente_id (FK)    |
| nome_procedimento   |
| data_procedimento   |
| observacoes         |
+----------------------+
