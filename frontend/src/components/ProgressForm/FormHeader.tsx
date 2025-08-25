import React from "react";
import { FileText, X } from "lucide-react";
import { Progress } from "../../types";

interface FormHeaderProps {
  andamento?: Progress;
  onCancel: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ andamento, onCancel }) => (
  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <FileText size={24} />
        <h2 className="text-xl font-bold">
          {andamento ? "Editar Andamento" : "Novo Andamento"}
        </h2>
      </div>
      <button
        onClick={onCancel}
        className="text-green-100 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  </div>
);

export default FormHeader;
