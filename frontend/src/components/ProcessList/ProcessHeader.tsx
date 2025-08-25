import { Plus, Search } from "lucide-react";

interface ProcessHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNew: () => void;
}

const ProcessHeader: React.FC<ProcessHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onNew,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar por número, cliente, advogado ou UF..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={onNew}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} />
        <span>Novo Processo</span>
      </button>
    </div>
  );
};

export default ProcessHeader;
