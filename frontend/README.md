# ⚖️ Sistema Jurídico – Cadastro de Processos Judiciais - Front-end

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
cp frontend/.env.example frontend/.env
```

E ajuste conforme necessário:

```env
VITE_API_URL=http://localhost:3000
```

---

### 🔹 Rodando com Docker (recomendado)

Na raiz do projeto, execute:

```bash
docker compose up frontend --build
```

Isso irá subir o serviço:

- **Frontend** → http://localhost:5173  

---

### 🔹 Rodando localmente (sem Docker)

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em: http://localhost:5173

---

### ✅ Conclusão

Agora você pode acessar:

- **Frontend:** http://localhost:5173 
