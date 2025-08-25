import React, { useState } from "react";
import { Modal } from "../Modal";
import ProgressHeader from "./ProgressHeader";
import ProgressStats from "./ProgressStats";
import ProgressTimeline from "./ProgressTimeline";
import { Progress } from "../../types";

interface ProgressListProps {
  andamentos: Progress[];
  loading: boolean;
  processoNumero: string;
  onEdit: (progress: Progress) => void;
  onDelete: (id: number) => void;
  onNew: () => void;
  onBack: () => void;
}

const ProgressList: React.FC<ProgressListProps> = ({
  andamentos,
  loading,
  processoNumero,
  onEdit,
  onDelete,
  onNew,
  onBack,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );

  const handleDeleteClick = (progress: Progress) => {
    setSelectedId(progress.id);
    setSelectedDescription(progress.description);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProgressHeader
        onBack={onBack}
        onNew={onNew}
        processoNumero={processoNumero}
      />
      <ProgressStats andamentos={andamentos} />
      <ProgressTimeline
        andamentos={andamentos}
        onEdit={onEdit}
        onDelete={handleDeleteClick}
        onNew={onNew}
      />

      {/* Modal de confirmação */}
      <Modal
        title="Excluir andamento"
        titleConfirm="Excluir"
        titleCancel="Desistir"
        type="exclude"
        message={
          <p className="text-gray-600 mb-6">
            Tem certeza que deseja excluir o andamento "
            <strong>{selectedDescription}</strong>"? <br />
            <br />
            Essa ação não poderá ser desfeita.
          </p>
        }
        show={showDeleteModal}
        onConfirm={() => {
          if (selectedId !== null) onDelete(selectedId);
          setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default ProgressList;
