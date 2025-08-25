import React, { useState, useMemo, useCallback } from "react";
import { Process } from "../../types";
import { Modal } from "../Modal";
import ProcessHeader from "./ProcessHeader";
import ProcessStats from "./ProcessStats";
import ProcessTable from "./ProcessTable";

interface ProcessListProps {
  processos: Process[];
  loading: boolean;
  onEdit: (processo: Process) => void;
  onDelete: (id: number) => void;
  onView: (processo: Process) => void;
  onNew: () => void;
}

const ProcessList: React.FC<ProcessListProps> = ({
  processos,
  loading,
  onEdit,
  onDelete,
  onView,
  onNew,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Process>("openingdate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteTarget, setDeleteTarget] = useState<Process | null>(null);

  const filteredProcessos = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return processos.filter(
      (p) =>
        p.number.includes(term) ||
        p.customer.toLowerCase().includes(term) ||
        p.advocate.toLowerCase().includes(term) ||
        p.uf.toLowerCase().includes(term)
    );
  }, [processos, searchTerm]);

  const sortedProcessos = useMemo(() => {
    return [...filteredProcessos].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue == null || bValue == null) return 0;

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredProcessos, sortField, sortDirection]);

  const handleSort = useCallback(
    (field: keyof Process) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProcessHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNew={onNew}
      />

      <ProcessStats processos={processos} />

      <ProcessTable
        processos={sortedProcessos}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onView={onView}
        onEdit={onEdit}
        onDelete={(p) => setDeleteTarget(p)}
      />

      <Modal
        title="Excluir processo"
        titleConfirm="Excluir"
        titleCancel="Desistir"
        type="exclude"
        message={
          <p className="text-gray-600 mb-6">
            Tem certeza que deseja excluir o processo "
            <strong>{deleteTarget?.number}</strong>"? <br />
            <br />
            Todos os andamentos também serão excluídos. Essa ação não poderá ser
            desfeita.
          </p>
        }
        show={!!deleteTarget}
        onConfirm={() => {
          if (deleteTarget) onDelete(deleteTarget.id);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default ProcessList;
