import React from "react";
import { Plus, ArrowLeft } from "lucide-react";

interface ProgressHeaderProps {
  onBack: () => void;
  onNew: () => void;
  processoNumero: string;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  onBack,
  onNew,
  processoNumero,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar aos Processos</span>
        </button>

        <button
          onClick={onNew}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          <span>Novo Andamento</span>
        </button>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Andamentos do Processo
        </h2>
        <p className="text-gray-600">
          <span className="font-medium">Processo:</span> {processoNumero}
        </p>
      </div>
    </div>
  );
};

export default ProgressHeader;
