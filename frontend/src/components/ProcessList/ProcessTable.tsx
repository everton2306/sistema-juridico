import {
  Calendar,
  MapPin,
  User,
  Scale,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import { Process } from "../../types";

interface ProcessTableProps {
  processos: Process[];
  sortField: keyof Process;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof Process) => void;
  onView: (processo: Process) => void;
  onEdit: (processo: Process) => void;
  onDelete: (processo: Process) => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({
  processos,
  sortField,
  sortDirection,
  onSort,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR");

  if (processos.length === 0) {
    return (
      <div className="text-center py-12">
        <Scale className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 text-lg">Nenhum processo encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {["number", "openingdate", "customer", "advocate", "uf"].map(
                (field) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => onSort(field as keyof Process)}
                  >
                    {field === "number" && "Número do Processo"}
                    {field === "openingdate" && "Data Abertura"}
                    {field === "customer" && "Cliente"}
                    {field === "advocate" && "Advogado"}
                    {field === "uf" && "UF"}
                    {sortField === field && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                )
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processos.map((processo) => (
              <tr key={processo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Scale className="text-blue-500 mr-2" size={16} />
                    <span className="text-sm font-medium text-gray-900">
                      {processo.number}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Calendar className="inline mr-2 text-gray-400" size={16} />
                  {formatDate(processo.openingdate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <User className="inline mr-2 text-gray-400" size={16} />
                  {processo.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {processo.advocate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      processo.uf === "MG"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <MapPin size={12} className="mr-1" />
                    {processo.uf}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onView(processo)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(processo)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(processo)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
