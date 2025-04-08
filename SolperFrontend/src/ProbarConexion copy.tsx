//Hace una prueba de conexión pasando el cors
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { adscripcionDTO } from "./adscripciones/adscripciones.model";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";


const ProbarConexion = ()=>{

    const [respuestaData,setRespuestaData]=useState<adscripcionDTO[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
    
            // Petición con manejo de errores
             const response: AxiosResponse<adscripcionDTO[]> = await axios.get('https://localhost:7167/adscripciones', {
              params: {
                pagina: 1,
                recordsPorPagina: 5
              }
            });
            //console.log("Haciendo el Get Respuesta: "+JSON.stringify(response.data, null, 2));
    
            // Procesamiento de la respuesta
            console.log('Datos recibidos del API:', response.data);
            setRespuestaData(response.data)
    
            console.log('Status:', response.status);
            console.log('Headers recibidos:', response.headers);
    
            // Si tu API envía paginación en headers (común en APIs REST)
            //const totalRecords = response.headers['x-total-count'];
            //if (totalRecords) {
            //  console.log('Total registros:', totalRecords);
            //}
    
          } catch (error) {
            // Manejo de errores
            if (axios.isAxiosError(error)) {
              console.error('Error de Axiossssss:', {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                data: error.response?.data
              });
              
              if (error.response) {
                // El servidor respondió con un código de error
                console.error('Error del servidor:', error.response.data);
              } else if (error.request) {
                // La petición fue hecha pero no hubo respuesta
                console.error('No hubo respuesta del servidor');
              } else {
                // Error al configurar la petición
                console.error('Error al configurar la petición:', error.message);
              }
            } else {
              console.error('Error inesperado:', error);
            }
          }
        };
        fetchData();
      }, []);
    }

    // Handlers para acciones por si se requieren (implementa tu lógica)
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
   

    // Extracción y presentación básica sin diseño
    // return(
    //     <>
    //     <h3>Probando conexión Cors</h3>
    //     {respuestaData.map((item) => (
    //     <div key={item.id} style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
    //       <h5>{item.nombre}</h5>
    //       {/* Renderiza otras propiedades según necesites */}
    //       <h5>{item.titular}</h5>
    //     </div>
    //     ))}
    //     </>
    // )

    //Presentación de diseño en forma de etiquetas
    // return (
    //     <div className="container my-4">
    //       <h2 className="text-center mb-4">🏢 Adscripciones</h2>
    //       <div className="row">
    //         {respuestaData.map((item, index) => (
    //           // Alternar entre "izquierda" (even) y "derecha" (odd)
    //           <div key={item.id} className={`col-md-6 mb-4 ${index % 2 === 0 ? "pe-md-3" : "ps-md-3"}`}>
    //             <div 
    //               className={`card shadow-sm h-100 border-0 ${item.id ? "border-primary" : "border-secondary"}`}
    //             >
    //               <div className="card-body">
    //                 <h4 className="card-title text-primary">{item.nombre}</h4>
    //                 <p className="card-text">
    //                   <span className="fw-bold">Titular: </span>
    //                   {item.titular}
    //                 </p>
    //                 <div className="d-flex justify-content-end">
    //                   <span className={`badge ${item.id ? "bg-success" : "bg-warning"}`}>
    //                     {item.id ? "Activo" : "Inactivo"}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );

    return (
        <>
        <h3>Probando conexión Cors</h3>
        </>
       );
  }

       export default ProbarConexion