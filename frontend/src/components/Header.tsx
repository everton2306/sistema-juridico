import React from "react";
import { Scale } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scale size={32} className="text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold">Sistema Jurídico</h1>
              <p className="text-blue-200 text-sm">
                Gestão de Processos e Andamentos
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
