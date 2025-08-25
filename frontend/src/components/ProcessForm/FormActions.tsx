import React from "react";
import { Save } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  isLoading?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, isLoading }) => (
  <div className="flex justify-end space-x-4 pt-4 border-t">
    <button
      type="button"
      onClick={onCancel}
      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Cancelar
    </button>
    <button
      type="submit"
      disabled={isLoading}
      className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      <Save size={18} />
      <span>{isLoading ? "Salvando..." : "Salvar"}</span>
    </button>
  </div>
);

export default FormActions;
