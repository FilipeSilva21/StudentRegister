# Student Register System

Este projeto é um sistema completo de cadastro de alunos, composto por uma API backend desenvolvida em **Spring Boot** e um frontend web desenvolvido em **Angular**.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.3.5**
- **Spring Data JPA** (Persistência de dados)
- **H2 Database** (Banco de dados em memória para desenvolvimento)
- **PostgreSQL** (Suporte para banco de dados relacional)
- **Lombok** (Produtividade no código Java)
- **Maven** (Gerenciamento de dependências)

### Frontend
- **Angular 19**
- **Angular Material** (UI Components)
- **RxJS** (Programação reativa)
- **ngx-mask** (Máscaras de input para CPF e telefone)
- **Moment.js** (Manipulação de datas)

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- JDK 17 ou superior
- Node.js (v18 ou superior)
- Angular CLI
- Maven

### ⚙️ Backend (`student-service`)

1. Navegue até a pasta do serviço:
   ```bash
   cd student-service
   ```
2. Instale as dependências e compile o projeto:
   ```bash
   mvn clean install
   ```
3. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```
A API estará disponível em `http://localhost:8080`.

### 💻 Frontend (`student-web`)

1. Navegue até a pasta do frontend:
   ```bash
   cd student-web
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
A aplicação estará disponível em `http://localhost:4200`.

---

## 📌 Funcionalidades Principais

- **Listagem de Alunos**: Visualização de todos os alunos cadastrados.
- **Cadastro de Novo Aluno**: Formulário para inserção de novos registros (Nome, E-mail, CPF, Telefone, Data de Nascimento).
- **Edição de Alunos**: Atualização de informações de alunos existentes.
- **Exclusão de Alunos**: Remoção de registros do sistema.
- **Busca**: Filtragem de alunos por nome ou outros critérios.

---

## 🔌 Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/v1/students` | Retorna todos os alunos |
| `POST` | `/v1/students` | Cadastra um novo aluno |
| `PUT` | `/v1/students/{id}` | Atualiza um aluno existente |
| `DELETE` | `/v1/students/{id}` | Remove um aluno |
| `GET` | `/v1/students/search` | Busca alunos com base em parâmetros |

---

## 📂 Estrutura do Projeto

```text
StudentRegister/
├── student-service/      # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/java/com/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── services/
│   └── pom.xml
└── student-web/          # Frontend (Angular)
    ├── src/
    │   ├── app/
    │   │   └── student/
    └── package.json
```
