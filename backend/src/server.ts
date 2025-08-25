import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import processesRoutes from "./routes/processes";
import progressRoutes from "./routes/progress";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// --- Middlewares globais ---

// Habilita CORS
app.use(cors({ origin: CORS_ORIGIN }));

// Logger de requisições HTTP
app.use(morgan("dev"));

// Parse de JSON nas requisições
app.use(express.json());

// --- Rotas principais ---

// Rota raiz
app.get("/", (req: Request, res: Response) => {
  res.send("API online 🚀");
});

// Rota de saúde
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Rotas separadas
app.use("/processes", processesRoutes);
app.use("/progress", progressRoutes);

// --- Middleware global de tratamento de erros ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Erro interno no servidor",
  });
});

// --- Inicialização do servidor ---
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
