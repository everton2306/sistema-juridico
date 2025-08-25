import React from "react";
import { Clock, FileText } from "lucide-react";
import { Progress } from "../../types";

interface ProgressStatsProps {
  andamentos: Progress[];
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ andamentos }) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total de andamentos */}
      <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total de Andamentos</p>
            <p className="text-2xl font-bold text-gray-900">
              {andamentos.length}
            </p>
          </div>
          <FileText className="text-green-500" size={24} />
        </div>
      </div>

      {/* Último andamento */}
      <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Último Andamento</p>
            <p className="text-sm font-medium text-gray-900">
              {andamentos.length > 0
                ? formatDate(andamentos[0].data)
                : "Nenhum andamento"}
            </p>
          </div>
          <Clock className="text-blue-500" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
