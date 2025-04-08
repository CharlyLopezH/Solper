//Renderizado del componente de Grid de Adscripciones
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { adscripcionDTO } from './adscripciones.model';


const TablaAdscripciones: React.FC<TablaAdscripcionesProps> = ({
  datos,
  onEditar,
  onBorrar,
  cargando = false,
  mensajeSinDatos = 'No hay registros disponibles.'
}) => {
  if (cargando) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Titular</th>            
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                {mensajeSinDatos}
              </td>
            </tr>
          ) : (
            datos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.titular}</td>
                {/* <td><span className={`badge ${item.id ? "bg-success" : "bg-secondary"}`}>{item.id ? "Activo" : "Inactivo"}</span></td> */}
                <td>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => onEditar(item.id)}
                      className="btn btn-sm btn-outline-primary"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onBorrar(item.id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAdscripciones;

interface TablaAdscripcionesProps {
    datos: adscripcionDTO[];
    onEditar: (id: number) => void;
    onBorrar: (id: number) => void;
    cargando?: boolean;
    mensajeSinDatos?: string;
  }