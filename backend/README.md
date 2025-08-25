# ⚖️ Sistema Jurídico – Cadastro de Processos Judiciais - Back-end

Pequeno sistema **fullstack** para cadastro e gerenciamento de processos judiciais e seus andamentos, desenvolvido em **React + Node.js + PostgreSQL**, com suporte a execução via **Docker**.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + TypeScript + TailwindCSS (Vite)
- **Backend:** Node.js + Express + Prisma ORM
- **Banco de Dados:** PostgreSQL (Docker) ou SQLite (execução local simples)
- **Containerização:** Docker + Docker Compose

---

## 📦 Requisitos

Antes de começar, você precisará ter instalado:

- [Node.js 20+](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop/) + Docker Compose
- (Opcional) [PostgreSQL + psql](https://www.postgresql.org/download/windows/) caso queira rodar o banco localmente

---

## ▶️ Instalação e Execução

### 🔹 Clonar o projeto
```bash
git clone https://github.com/everton2306/sistema-juridico.git
cd sistema-juridico
```

### 🔹 Configuração do arquivo `.env`

No repositório existe um arquivo `.env.example` que serve de modelo.  
Após clonar o projeto, duplique este arquivo e renomeie para `.env`:

```bash
cp backend/.env.example backend/.env
```

Em seguida, ajuste os valores conforme necessário. Exemplo padrão (SQLite):

```env
DATABASE_URL="file:./dev.db"
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

Ou para PostgreSQL (Docker):

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/sistema_juridico"
```

### 🔹 Rodando com Docker (recomendado)

Na raiz do projeto, execute:

```bash
docker compose up backend --build
```

ou se quiser rebuild forçado:

```bash
docker compose up --build backend
```

Isso irá subir os serviço:

- **Backend** → http://localhost:3000  
- **PostgreSQL** → localhost:5432  

O backend já aplica automaticamente as migrações do Prisma no banco.

---

### 🔹 Rodando localmente (sem Docker)

#### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

API disponível em: http://localhost:3000

---

### 📡 Endpoints da API

#### Processos
- `POST /processes` → Criar processo  
- `GET /processes` → Listar processos  
- `GET /processes/:id` → Buscar processo por ID  
- `PUT /processes/:id` → Atualizar processo  
- `DELETE /processes/:id` → Excluir processo (e seus andamentos)  

#### Andamentos (progress)
- `POST /progress/:processId` → Adicionar andamento a um processo  
- `PUT /progress/:id` → Atualizar andamento  
- `DELETE /progress/:id` → Excluir andamento  

---

### 🧪 Exemplos de uso da API (via cURL)

#### Criar um processo
```bash
curl -X POST http://localhost:3000/processes   -H "Content-Type: application/json"   -d '{
    "number": "2025-0001",
    "description": "Ação trabalhista contra empresa XPTO",
    "openingdate": "2025-02-01",
    "customer": "Cliente XYZ",
    "advocate": "DR. XPTO",
    "uf": "MG"
  }'
```

#### Listar processos
```bash
curl http://localhost:3000/processes
```

#### Buscar processo por ID
```bash
curl http://localhost:3000/processes/1
```

#### Atualizar processo
```bash
curl -X PUT http://localhost:3000/processes/1   -H "Content-Type: application/json"   -d '{
    "description": "Ação trabalhista atualizada",
    "customer": "Cliente WXYZ"
  }'
```

#### Excluir processo
```bash
curl -X DELETE http://localhost:3000/processes/1
```

#### Criar andamento em um processo
```bash
curl -X POST http://localhost:3000/progress/1   -H "Content-Type: application/json"   -d '{
    "data": "2025-02-01",
    "description": "Audiência de conciliação marcada para 10/09/2025"
  }'
```

#### Atualizar andamento
```bash
curl -X PUT http://localhost:3000/progress/1   -H "Content-Type: application/json"   -d '{
    "description": "Audiência realizada com acordo parcial"
  }'
```

#### Excluir andamento
```bash
curl -X DELETE http://localhost:3000/progress/1
```

---

### 🛠️ Configuração do PostgreSQL (para rodar localmente sem Docker)

Caso precise do `psql`:

1. Instale o PostgreSQL do site oficial: https://www.postgresql.org/download/windows/  
2. Durante a instalação, marque a opção **Command Line Tools (psql)**.  
3. Adicione a pasta `bin` do PostgreSQL ao **PATH** do Windows, por exemplo:  
   ```
   C:\Program Files\PostgreSQL\16\bin
   ```
4. Teste no terminal:  
   ```bash
   psql --version
   ```

---

### ✅ Conclusão

Agora você pode acessar:

- **Backend (API):** http://localhost:3000  
