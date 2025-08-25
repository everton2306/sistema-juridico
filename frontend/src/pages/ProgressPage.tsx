import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProgressList from "../components/ProgressList/ProgressList";
import ProgressForm from "../components/ProgressForm/ProgressForm";
import { useProcesses } from "../hooks/useProcesses";
import { useProgress } from "../hooks/useProgress";
import { Progress } from "../types";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

export function ProgressPage() {
  const navigate = useNavigate();
  const { processId } = useParams<{ processId: string }>();
  const processIdNumber = Number(processId);

  const { processes } = useProcesses();

  const [showProgressForm, setShowProgressForm] = useState(false);
  const [editingAndamento, setEditingAndamento] = useState<
    Progress | undefined
  >();

  const selectedProcess = processes.find((p) => p.id === processIdNumber);

  const { loading, progress, create, update, deleteProgress } =
    useProgress(processIdNumber);

  // Handlers para Andamentos
  const handleNewAndamento = () => {
    setEditingAndamento(undefined);
    setShowProgressForm(true);
  };

  const handleEditAndamento = (andamento: Progress) => {
    setEditingAndamento(andamento);
    setShowProgressForm(true);
  };

  const handleSaveAndamento = async (andamentoData: {
    data: string;
    description: string;
  }) => {
    try {
      if (editingAndamento) {
        await update(editingAndamento.id, andamentoData).then(() => {
          toast.success("Andamento atualizado com sucesso");
        });
      } else {
        await create(andamentoData).then(() => {
          toast.success("Andamento criado com sucesso");
        });
      }
      setShowProgressForm(false);
      setEditingAndamento(undefined);
    } catch (error) {
      console.error("Erro ao salvar andamento:", error);
      toast.error("Erro ao salvar andamento");
    }
  };

  const handleDeleteAndamento = async (id: number) => {
    try {
      await deleteProgress(id).then(() => {
        toast.success("Andamento deletado com sucesso");
      });
    } catch (error) {
      console.error("Erro ao excluir andamento:", error);
      toast.error("Erro ao excluir andamento");
    }
  };

  const handleBackToProcessos = () => {
    navigate("/");
  };

  if (!selectedProcess)
    return (
      <>
        <Header />

        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600"></div>
              <p className="text-gray-700 text-lg">Carregando processo...</p>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center flex flex-col items-center">
              <Search
                className="text-gray-400"
                size={48}
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Processo não encontrado
              </h2>
              <p className="text-gray-500 mb-4">
                O processo que você está tentando acessar não existe ou foi
                removido.
              </p>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Voltar
              </button>
            </div>
          )}
        </div>
      </>
    );

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <ProgressList
          andamentos={progress}
          loading={false}
          processoNumero={selectedProcess.number}
          onEdit={handleEditAndamento}
          onDelete={handleDeleteAndamento}
          onNew={handleNewAndamento}
          onBack={handleBackToProcessos}
        />
      </div>

      {showProgressForm && (
        <ProgressForm
          andamento={editingAndamento}
          onSave={handleSaveAndamento}
          onCancel={() => {
            setShowProgressForm(false);
            setEditingAndamento(undefined);
          }}
          isLoading={false}
        />
      )}
    </>
  );
}
