//Hace una prueba de conexión pasando el cors
//Simple página Index de muestra con datos de DB
//Presentación de Datos con Diseño
//Nueva versión realiza búsqueda
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { adscripcionDTO } from "./adscripciones.model";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { urlAdscripciones } from "../utils/endpoints";
import Paginacion from "../utils/paginador/Paginacion";
import BuscadorAdscripciones from "./BuscadorAdscripciones";
import SelectorRecsPorPagina from "../utils/paginador/SelectorRecsPorPagina";
import TablaAdscripciones from "./TablaAdscripciones";

const IndexAdscripciones = () => {
  const [respuestaData, setRespuestaData] = useState<adscripcionDTO[]>([]);
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [recordsPorPagina, setRecordsPorPagina] = useState(10);
  const [pagina, setPagina] = useState(1);

  //Variables de estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el input

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

  // 1. Memorizar con useCallback la función fetchData para usarla después
  const fetchData = useCallback(async () => {
    try {
      const response: AxiosResponse<adscripcionDTO[]> = await axios.get(
        urlAdscripciones,
        {
          params: { pagina, recordsPorPagina },
        }
      );
      const totalDeRegistros = parseInt(
        response.headers["cantidadtotalregistros"],
        10
      );
      setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
      setRespuestaData(response.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }, [pagina, recordsPorPagina]); // Dependencias del useCallback

  // useEffect necesario para mantener actualizado el view
  // Depende de useCallBack su ejecución para mantener expuesta la fetchData
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Ahora depende de fetchData

  // Función de búsqueda (con tipado AxiosResponse)
  const onHandleSearch = async () => {
    if (searchTerm.trim().length < 2) return;

    try {
      const response: AxiosResponse<adscripcionDTO[]> = await axios.get(
        `${urlAdscripciones}/buscarRegistros/${searchTerm}`
        //{ params: { cadena: searchTerm } }
      );
      setRespuestaData(response.data);
      setTotalDePaginas(1); // Resetear paginación durante búsqueda
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <>
      <h3>Índice de Adscripciones de tabla con páginación</h3>
      <hr />
      <div className="container mt-4">
        <h2 className="mb-4">📋 Adscripciones</h2>

        <div>
          <form>
            <div className="input-group mb-3">
              <div className="container mt-4">
                {/* Buscador */}
                <BuscadorAdscripciones
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onHandleSearch={onHandleSearch}
                  fetchData={fetchData}
                />
              </div>
            </div>
          </form>
        </div>

        <SelectorRecsPorPagina
        defaultValue={recordsPorPagina}
        onChange={setRecordsPorPagina}
        setPagina={setPagina}
        />
        
        <p />

        {/* Tabla */}
        <div className="table-responsive">
        <TablaAdscripciones 
          datos={respuestaData} 
          onEditar={handleEditar} 
          onBorrar={handleBorrar}
          cargando={false}
          mensajeSinDatos="No se encontraron adscripciones"
          />
        </div>

        <Paginacion
          paginaActual={pagina}
          cantidadTotalDePaginas={totalDePaginas}
          radio={3}
          onChange={(nuevaPagina) => setPagina(nuevaPagina)}
        />

        {/* Botón "Nuevo" */}
        <div className="d-flex justify-content-end mt-3">
          <button onClick={handleNuevo} className="btn btn-primary">
            <FaPlus className="me-2" />
            Nuevo Registro
          </button>
        </div>
      </div>
    </>
  );
};
export default IndexAdscripciones;
