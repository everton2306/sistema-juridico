import React from "react";
import { Edit2, Trash2, Clock, FileText } from "lucide-react";
import { Progress } from "../../types";

interface ProgressTimelineProps {
  andamentos: Progress[];
  onEdit: (progress: Progress) => void;
  onDelete: (progress: Progress) => void;
  onNew: () => void;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  andamentos,
  onEdit,
  onDelete,
  onNew,
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR");

  if (andamentos.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 text-lg mb-4">
          Nenhum andamento cadastrado
        </p>
        <button
          onClick={onNew}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Adicionar Primeiro Andamento
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Timeline de Andamentos
      </h3>
      <div className="space-y-6">
        {andamentos.map((andamento, index) => (
          <div key={andamento.id} className="relative">
            {index < andamentos.length - 1 && (
              <div className="absolute left-4 top-12 w-0.5 h-16 bg-gray-300"></div>
            )}

            <div className="flex items-start space-x-4">
              {/* Círculo da timeline */}
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="text-white" size={16} />
              </div>

              {/* Conteúdo do andamento */}
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-green-600">
                      {formatDate(andamento.data)}
                    </span>
                    <p className="text-gray-900 leading-relaxed mt-1">
                      {andamento.description}
                    </p>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => onEdit(andamento)}
                      className="text-yellow-600 hover:text-yellow-900 transition-colors"
                      title="Editar andamento"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(andamento)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Excluir andamento"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTimeline;
