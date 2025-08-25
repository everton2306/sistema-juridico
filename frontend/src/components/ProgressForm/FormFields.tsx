import React from "react";
import { Controller, Control } from "react-hook-form";
import { Calendar, FileText } from "lucide-react";
import { ProgressFormData } from "../../lib/schemas/progressSchema";

interface FormFieldsProps {
  control: Control<ProgressFormData>;
}

const FormFields: React.FC<FormFieldsProps> = ({ control }) => (
  <>
    {/* Data do Andamento */}
    <Controller
      name="data"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} />
            <span>Data do Andamento *</span>
          </label>
          <input
            {...field}
            type="date"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              fieldState.error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />

    {/* Descrição */}
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <FileText size={16} />
            <span>Descrição *</span>
          </label>
          <textarea
            {...field}
            rows={4}
            placeholder="Descreva o andamento processual..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              fieldState.error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  </>
);

export default FormFields;
