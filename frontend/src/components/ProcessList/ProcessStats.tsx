import { Scale, MapPin } from "lucide-react";
import { Process } from "../../types";

interface ProcessStatsProps {
  processos: Process[];
}

const ProcessStats: React.FC<ProcessStatsProps> = ({ processos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* total */}
      <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total de Processos</p>
            <p className="text-2xl font-bold text-gray-900">
              {processos.length}
            </p>
          </div>
          <Scale className="text-blue-500" size={24} />
        </div>
      </div>

      {/* MG */}
      <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Processos MG</p>
            <p className="text-2xl font-bold text-gray-900">
              {processos.filter((p) => p.uf === "MG").length}
            </p>
          </div>
          <MapPin className="text-green-500" size={24} />
        </div>
      </div>

      {/* outros estados */}
      <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Outros Estados</p>
            <p className="text-2xl font-bold text-gray-900">
              {processos.filter((p) => p.uf !== "MG").length}
            </p>
          </div>
          <MapPin className="text-purple-500" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ProcessStats;
