import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProcessesPage } from "./pages/ProcessesPage";
import { ProgressPage } from "./pages/ProgressPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#10b981",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
      <Routes>
        {/* ROTAS PUBLICAS */}
        <Route path="/" element={<ProcessesPage />} />
        <Route path="/process" element={<ProcessesPage />} />
        <Route path="/progress/:processId" element={<ProgressPage />} />
      </Routes>
    </div>
  );
}
