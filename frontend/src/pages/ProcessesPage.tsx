import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Process } from "../types";
import { useProcesses } from "../hooks/useProcesses";
import Header from "../components/Header";
import ProcessList from "../components/ProcessList/ProcessList";
import ProcessForm from "../components/ProcessForm/ProcessForm";
import toast from "react-hot-toast";

export function ProcessesPage() {
  const navigate = useNavigate();
  const [showProcessoForm, setShowProcessoForm] = useState(false);
  const [editingProcesso, setEditingProcesso] = useState<Process | undefined>();

  const {
    processes,
    loading: processosLoading,
    createProcess,
    updateProcess,
    deleteProcess,
  } = useProcesses();

  // Abrir modal para novo processo
  const handleNewProcesso = () => {
    setEditingProcesso(undefined);
    setShowProcessoForm(true);
  };

  // Abrir modal para editar processo existente
  const handleEditProcesso = (processo: Process) => {
    setEditingProcesso(processo);
    setShowProcessoForm(true);
  };

  // Salvar processo (novo ou editado)
  const handleSaveProcesso = async (
    processoData: Omit<Process, "id" | "andamentos">
  ) => {
    try {
      if (editingProcesso) {
        await updateProcess(editingProcesso.id, processoData).then(() => {
          toast.success("Processo atualizado com sucesso");
        });
      } else {
        await createProcess(processoData);
      }
      setShowProcessoForm(false);
      setEditingProcesso(undefined);
    } catch (err: any) {
      console.error("Erro ao salvar processo:", err);
      toast.error(err.error);
    }
  };

  // Excluir processo
  const handleDeleteProcesso = async (id: number) => {
    try {
      await deleteProcess(id).then(() => {
        toast.success("Processo deletado com sucesso");
      });
    } catch (err) {
      console.error("Erro ao excluir processo:", err);
      toast.error("Erro ao excluir processo");
    }
  };

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <ProcessList
          processos={processes}
          loading={processosLoading}
          onEdit={handleEditProcesso}
          onDelete={(p) => handleDeleteProcesso(p)}
          onView={(p) => navigate(`/progress/${p.id}`)}
          onNew={handleNewProcesso}
        />
      </div>

      {showProcessoForm && (
        <ProcessForm
          processo={editingProcesso}
          onSave={handleSaveProcesso}
          onCancel={() => {
            setShowProcessoForm(false);
            setEditingProcesso(undefined);
          }}
          isLoading={processosLoading}
        />
      )}
    </>
  );
}
