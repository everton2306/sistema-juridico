import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Calendar, User, MapPin, FileText, Scale } from "lucide-react";
import { ESTADOS_BRASIL } from "../../types";
import { ProcessFormData } from "../../lib/schemas/processSchema";

interface FormFieldsProps {
  control: Control<ProcessFormData>;
  errors: FieldErrors<ProcessFormData>;
}

const FormFields: React.FC<FormFieldsProps> = ({ control, errors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Número do Processo */}
    <div className="md:col-span-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
        <FileText size={16} />
        <span>Número do Processo *</span>
      </label>
      <Controller
        name="number"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Ex: 5001234-12.2024.8.13.0001"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.number ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {errors.number && (
        <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
      )}
    </div>

    {/* Data de Abertura */}
    <div>
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
        <Calendar size={16} />
        <span>Data de Abertura *</span>
      </label>
      <Controller
        name="openingdate"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="date"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.openingdate ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {errors.openingdate && (
        <p className="text-red-500 text-sm mt-1">
          {errors.openingdate.message}
        </p>
      )}
    </div>

    {/* UF */}
    <div>
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
        <MapPin size={16} />
        <span>UF do Processo *</span>
      </label>
      <Controller
        name="uf"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.uf ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione a UF</option>
            {ESTADOS_BRASIL.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.sigla} - {estado.nome}
              </option>
            ))}
          </select>
        )}
      />
      {errors.uf && (
        <p className="text-red-500 text-sm mt-1">{errors.uf.message}</p>
      )}
    </div>

    {/* Cliente */}
    <div>
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
        <User size={16} />
        <span>Cliente *</span>
      </label>
      <Controller
        name="customer"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Nome completo do cliente"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.customer ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {errors.customer && (
        <p className="text-red-500 text-sm mt-1">{errors.customer.message}</p>
      )}
    </div>

    {/* Advogado */}
    <div>
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
        <Scale size={16} />
        <span>Advogado *</span>
      </label>
      <Controller
        name="advocate"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Nome do advogado responsável"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.advocate ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {errors.advocate && (
        <p className="text-red-500 text-sm mt-1">{errors.advocate.message}</p>
      )}
    </div>

    {/* Descrição */}
    <div className="md:col-span-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
        <FileText size={16} />
        <span>Descrição *</span>
      </label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            rows={4}
            placeholder="Descrição detalhada do processo judicial..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {errors.description && (
        <p className="text-red-500 text-sm mt-1">
          {errors.description.message}
        </p>
      )}
    </div>
  </div>
);

export default FormFields;
