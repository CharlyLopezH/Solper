import React from 'react';

const SelectorRecsPorPagina: React.FC<SelectorRecsPorPaginaProps> = ({
  defaultValue = 10,
  onChange,
  opciones = [5, 10, 25, 50],
  setPagina
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setPagina(1); // Resetear a la primera página
    onChange(value);
  };

  return (
    <div className="form-floating" style={{ width: "150px" }}>
      <select
        className="form-select"
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-label="Selecciona cantidad de registros por página"
      >
        {opciones.map((opcion) => (
          <option 
            key={opcion} 
            value={opcion}
            className="select-option"
          >
            {opcion}
          </option>
        ))}
      </select>
      <label>Registros por página</label>
    </div>
  );
};

export default SelectorRecsPorPagina;

interface SelectorRecsPorPaginaProps {
  defaultValue?: number;
  onChange: (value: number) => void;
  opciones?: number[];
  setPagina: (pagina: number) => void;
}