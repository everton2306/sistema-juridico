FROM node:20-slim

# Instala dependências do sistema (inclui openssl)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia configs antes para cache eficiente
COPY package*.json tsconfig.json ./

RUN npm install

# Copia o restante do código
COPY . .

# Gera cliente do Prisma
RUN npx prisma generate

# Compila o TypeScript para dist/
RUN npm run build

EXPOSE 3000

# Roda migrações e sobe o servidor já compilado
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

