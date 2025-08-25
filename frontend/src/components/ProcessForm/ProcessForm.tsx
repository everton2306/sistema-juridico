import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  processSchema,
  ProcessFormData,
} from "../../lib/schemas/processSchema";
import { Process } from "../../types";
import FormHeader from "./FormHeader";
import FormFields from "./FormFields";
import FormActions from "./FormActions";

interface ProcessFormProps {
  processo?: Process;
  onSave: (
    processo: Omit<Process, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProcessForm: React.FC<ProcessFormProps> = ({
  processo,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProcessFormData>({
    resolver: zodResolver(processSchema),
    defaultValues: {
      number: "",
      openingdate: "",
      description: "",
      customer: "",
      advocate: "",
      uf: "",
    },
  });

  useEffect(() => {
    if (processo) {
      setValue("number", processo.number);
      setValue("openingdate", processo.openingdate.split("T")[0]);
      setValue("description", processo.description);
      setValue("customer", processo.customer);
      setValue("advocate", processo.advocate);
      setValue("uf", processo.uf);
    }
  }, [processo, setValue]);

  const onSubmit = async (data: ProcessFormData) => {
    try {
      await onSave({
        ...data,
        openingdate: new Date(data.openingdate).toISOString(),
      });
    } catch (error) {
      console.error("Erro ao salvar processo:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <FormHeader processo={processo} onCancel={onCancel} />
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <FormFields control={control} errors={errors} />
          <FormActions onCancel={onCancel} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default ProcessForm;
