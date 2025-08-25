import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  progressSchema,
  ProgressFormData,
} from "../../lib/schemas/progressSchema";
import { Progress } from "../../types";
import FormHeader from "./FormHeader";
import FormFields from "./FormFields";
import FormActions from "./FormActions";

interface ProgressFormProps {
  andamento?: Progress;
  onSave: (a: { data: string; description: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProgressForm: React.FC<ProgressFormProps> = ({
  andamento,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const { control, handleSubmit, setValue } = useForm<ProgressFormData>({
    resolver: zodResolver(progressSchema),
    defaultValues: { data: "", description: "" },
  });

  // Preencher formulário se houver andamento
  useEffect(() => {
    if (andamento) {
      setValue("data", andamento.data.split("T")[0]);
      setValue("description", andamento.description);
    } else {
      setValue("data", new Date().toISOString().split("T")[0]);
    }
  }, [andamento, setValue]);

  const onSubmit = async (data: ProgressFormData) => {
    try {
      await onSave({ ...data, data: new Date(data.data).toISOString() });
    } catch (err) {
      console.error("Erro ao salvar andamento:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        <FormHeader andamento={andamento} onCancel={onCancel} />
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <FormFields control={control} />
          <FormActions onCancel={onCancel} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default ProgressForm;
