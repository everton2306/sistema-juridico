import React from "react";
import { X, Scale } from "lucide-react";
import { Process } from "../../types";

interface FormHeaderProps {
  processo?: Process;
  onCancel: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ processo, onCancel }) => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Scale size={24} />
        <h2 className="text-xl font-bold">
          {processo ? "Editar Processo" : "Novo Processo"}
        </h2>
      </div>
      <button
        onClick={onCancel}
        className="text-blue-100 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  </div>
);

export default FormHeader;
