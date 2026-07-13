# Task Manager - Documentação Técnica

## Índice

1. [Arquitetura da Solução](#arquitetura-da-solução)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Como Executar o Projeto](#como-executar-o-projeto)
4. [Principais Decisões Técnicas](#principais-decisões-técnicas)

---

1. Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Pages (Frontend)                   │
│  React + TypeScript + Tailwind + Vite                        │
│  https://gbpinheiro1.github.io/task-manager                  │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTP/CORS Requests
                  ↓
┌─────────────────────────────────────────────────────────────┐
│                   Render (Backend)                           │
│  Fastify + TypeScript + Drizzle ORM                          │
│  https://task-manager-mi2r.onrender.com                      │
└─────────────────┬───────────────────────────────────────────┘
                  │ SQL Queries
                  ↓
┌─────────────────────────────────────────────────────────────┐
│              Neon Database (PostgreSQL)                      │
│                                                              |
└─────────────────────────────────────────────────────────────┘
```

**Fluxo de Dados:**

- Frontend (GitHub Pages) envia requisições HTTP/HTTPS para o backend em Render
- Backend valida, processa e persiste dados no PostgreSQL Neon
- 
---

2. Tecnologias Utilizadas

### Frontend

- **React** 
- **TypeScript** 
- **Tailwind CSS** 
- **Vite**
- **Axios** - HTTP client para requisições

### Backend

- **Fastify** - Web framework leve e rápido
- **TypeScript**
- **Drizzle ORM**
- **PostgreSQL**
- **Zod** - Validação de schemas e APIs em runtime

### Banco de Dados

- **Neon** - PostgreSQL
- **Drizzle**

### Testes

- **Vitest**


### Deployment

- **GitHub Pages** - Frontend
- **Render** - backend
- **Neon** - Banco de dados

---

3. Como Executar o Projeto

### Desenvolvimento Local

#### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Neon para banco de dados
- Git

#### Setup Backend

1. **Clone e instale dependências:**

```bash
cd backend
npm install
```

2. **Configure variáveis de ambiente:**

```bash
# Criar arquivo .env
DATABASE_URL="postgresql://user:password@host/database"
```

3. **Execute as migrations do banco de dados:**

```bash
npm run db:migrate
```

4. **Inicie o servidor:**

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3333`

#### Setup Frontend

1. **Instale dependências:**

```bash
cd frontend
npm install
```

2. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

4. Principais Decisões Técnicas

### 1. **Arquitetura em Três Camadas (Frontend → Backend → Database)**

**Por que?** Separação de responsabilidades.

### 2. **Fastify ao Invés de Express**

**Por que?** Fastify é ~3x mais rápido que Express com melhor suporte a TypeScript nativo.

### 3. **Drizzle ORM**

**Por que?** Tipagem TypeScript e sintaxe mais próxima ao SQL.

### 4. **PostgreSQL**

**Por que?** Utilização do Neon pela facilidade de subir o db na nuvem.

### 5. **Vitest**

**Por que?** Vitest tem melhor compatibilidade com TypeScript.

Para executar os Testes:

```bash
cd backend

# Ver UI visual dos testes
npm run test:ui

```
