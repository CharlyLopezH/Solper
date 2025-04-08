//Hace una prueba de conexión pasando el cors
//Simple página Index de muestra con datos de DB
//Presentación de Datos con Diseño
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { adscripcionDTO } from "./adscripciones.model";
import { FaEdit, FaTrash, FaPlus} from "react-icons/fa";
import { urlAdscripciones } from "../utils/endpoints";
import Paginacion from "../utils/paginador/Paginacion";
//import OpcionesPaginador from "../utils/paginador/OpcionesPaginacion";
import BuscadorAdscripciones from "./BuscadorAdscripciones";


const IndexAdscripciones = ()=>{

  const [respuestaData,setRespuestaData]=useState<adscripcionDTO[]>([]);
  const [totalDePaginas,setTotalDePaginas]=useState(0);
  const [recordsPorPagina, setRecordsPorPagina]=useState(10);
  const [pagina,setPagina]=useState(1);

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

  // useEffect(() => {
  //   //console.log('UseEffect')
  //   const fetchData = async () => {
  //   try {

  //     // Petición con manejo de errores
  //     //Ruta completa del endpoint antes de configurar el archivo .env (dev / prod)
  //     //const response: AxiosResponse<adscripcionDTO[]> = await axios.get('https://localhost:7167/adscripciones', {
  //     //Ruta del endpoint ajustada para utilizar la información del archivo .env (prod / dev) ver: .env.development + endpoints.ts
  //     //console.log('urlAdscripciones ',urlAdscripciones);
  //       const response: AxiosResponse<adscripcionDTO[]> = await axios.get(urlAdscripciones, {
  //       params: {
  //         pagina,
  //         recordsPorPagina,
  //       }
  //     });
  //     const totalDeRegistros=parseInt(response.headers['cantidadtotalregistros'],10)
  //     setTotalDePaginas(Math.ceil(totalDeRegistros/recordsPorPagina))
  //     console.log('response.data',response)
  //     //console.log("Haciendo el Get Respuesta: "+JSON.stringify(response.data, null, 2));
  //                 // Procesamiento de la respuesta
  //                 //console.log('Datos recibidos del API:', response.data);
  //                 //Mete la respuesta a la variable de estado
  //                 setRespuestaData(response.data)
  //   } catch (error) {
      
  //   }
  // }
  //  fetchData(); 
  // },[pagina, recordsPorPagina]);


// 1. Convertimos fetchData en una función memorizada con useCallback
const fetchData = useCallback(async () => {
  try {
    const response: AxiosResponse<adscripcionDTO[]> = await axios.get(urlAdscripciones, {
      params: { pagina, recordsPorPagina }
    });
    const totalDeRegistros = parseInt(response.headers['cantidadtotalregistros'], 10);
    setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
    setRespuestaData(response.data);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}, [pagina, recordsPorPagina]); // Dependencias del useCallback


  // 2. useEffect que usa fetchData
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Ahora depende de fetchData



 // Función de búsqueda (con tipado AxiosResponse)
 const onHandleSearch = async () => {
  if (searchTerm.trim().length < 2) return;

  try {
    const response: AxiosResponse<adscripcionDTO[]> = await axios.get(`${urlAdscripciones}/buscarRegistros/${searchTerm}`
      //{ params: { cadena: searchTerm } }      
    );
    setRespuestaData(response.data);
    setTotalDePaginas(1); // Resetear paginación durante búsqueda
  } catch (error) {
    console.error("Error al buscar:", error);
  }
};


  return(
  <>
  <h3>
    Índice de Adscripciones de tabla con páginación
  </h3>
  <hr/>

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
        
        {/* Poner atención aquí!!   */}
        {/* <input type="text" className="form-control" placeholder="Buscar..." />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>{onHandleSearch}}> <FaSearch /></button> */}
      </div>
        </form>
      </div>

      <div className="form-floating" style={{width:'150px'}}>
      <select 
              className="form-select"
              defaultValue={10}
              onChange={e=>{
                setPagina(1);
                setRecordsPorPagina(parseInt(e.currentTarget.value,10))
              }}>
        <option className="select-option" value={5}> 5 </option>
        <option className="select-option" value={10}> 10 </option>
        <option className="select-option" value={15}> 25 </option>
        <option className="select-option" value={50}> 50 </option>
      </select>
      <label>Registros por Página</label>
      </div>
      <p/>

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

      <Paginacion paginaActual={pagina} 
                  cantidadTotalDePaginas={totalDePaginas} 
                  radio={3} 
                  onChange={nuevaPagina=> setPagina(nuevaPagina) }
      />   

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
export default IndexAdscripciones
