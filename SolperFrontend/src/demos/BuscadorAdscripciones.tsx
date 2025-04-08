import { FaSearch, FaTimes } from "react-icons/fa";
import React from "react";


const BuscadorAdscripciones: React.FC<BuscadorAdscripcionesProps> = ({
  searchTerm,
  setSearchTerm,
  onHandleSearch,
  fetchData
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onHandleSearch();
    }
  };

  const handleReset = async () => {
    setSearchTerm('');
    await fetchData();
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={onHandleSearch}
        disabled={searchTerm.trim().length < 2}
      >
        <FaSearch />
      </button>
      {searchTerm && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleReset}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default BuscadorAdscripciones;

interface BuscadorAdscripcionesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onHandleSearch: () => void | Promise<void>;
  fetchData: () => void | Promise<void>;
}