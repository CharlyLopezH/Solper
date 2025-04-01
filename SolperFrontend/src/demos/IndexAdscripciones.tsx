//Hace una prueba de conexión pasando el cors
//Simple página Index de muestra con datos de DB
//Presentación de Datos con Diseño
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { adscripcionDTO } from "./adscripciones.model";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { urlAdscripciones } from "../utils/endpoints";
import Paginacion from "../utils/paginador/Paginacion";


const ConexionConTablaDesign = ()=>{

  const [respuestaData,setRespuestaData]=useState<adscripcionDTO[]>([]);
  const [totalDePaginas,setTotalDePaginas]=useState(0);
  const [recordsPorPagina, setRecordsPorPagina]=useState(5);
  const [pagina,setPagina]=useState(1);

    // Handlers para acciones (implementa tu lógica)
    const handleEditar = (id: number) => {
      console.log("Editar registro con ID:", id);
      // Ejemplo: navegar a `/editar/${id}`
    };
  
    const handleBorrar = (id: number) => {
      console.log("Borrar registro con ID:", id);
      // Ejemplo: mostrar modal de confirmación
    };
  
    const handleNuevo = () => {
      console.log("Crear nuevo registro");
      // Ejemplo: navegar a `/nuevo`
    };

  useEffect(() => {
    //console.log('UseEffect')
    const fetchData = async () => {
    try {

      // Petición con manejo de errores
      //Ruta completa del endpoint antes de configurar el archivo .env (dev / prod)
      //const response: AxiosResponse<adscripcionDTO[]> = await axios.get('https://localhost:7167/adscripciones', {
      //Ruta del endpoint ajustada para utilizar la información del archivo .env (prod / dev) ver: .env.development + endpoints.ts
      //console.log('urlAdscripciones ',urlAdscripciones);
        const response: AxiosResponse<adscripcionDTO[]> = await axios.get(urlAdscripciones, {
        params: {
          pagina,
          recordsPorPagina,

        }
      });
      const totalDeRegistros=parseInt(response.headers['cantidadtotalregistros'],10)
      setTotalDePaginas(Math.ceil(totalDeRegistros/recordsPorPagina))
      //console.log('DATA',response.data)
      //console.log("Haciendo el Get Respuesta: "+JSON.stringify(response.data, null, 2));
                  // Procesamiento de la respuesta
                  //console.log('Datos recibidos del API:', response.data);
                  //Mete la respuesta a la variable de estado
                  setRespuestaData(response.data)
    } catch (error) {
      
    }
  }
   fetchData(); 
  },[pagina, recordsPorPagina]);

  return(
  <>
  <h3>
    Índice de Adscripciones de tabla con páginación
  </h3>
  <hr/>

  <div className="container mt-4">
      <h2 className="mb-4">📋 Adscripciones</h2>

      <Paginacion paginaActual={pagina} cantidadTotalDePaginas={totalDePaginas} radio={3} onChange={nuevaPagina=> setPagina(nuevaPagina) }
          />      
      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Titular</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {respuestaData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No hay registros disponibles.
                </td>
              </tr>
            ) : (
              respuestaData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.titular}</td>
                  <td>
                    <span className={`badge ${item.id ? "bg-success" : "bg-secondary"}`}>
                      {item.id ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        onClick={() => handleEditar(item.id)}
                        className="btn btn-sm btn-outline-primary"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleBorrar(item.id)}
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

      {/* Botón "Nuevo" */}
      <div className="d-flex justify-content-end mt-3">
        <button 
          onClick={handleNuevo}
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Nuevo Registro
        </button>
      </div>
    </div>

  </>
  )
}
export default ConexionConTablaDesign
