//Hace una prueba de conexión pasando el cors
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { adscripcionDTO } from "./adscripciones/adscripciones.model";


const ProbandoConexion = ()=>{

  const [respuestaData,setRespuestaData]=useState<adscripcionDTO[]>([]);

  useEffect(() => {
    console.log('UseEffect')
    const fetchData = async () => {
    try {

      // Petición con manejo de errores
      const response: AxiosResponse<adscripcionDTO[]> = await axios.get('https://localhost:7167/adscripciones', {
        params: {
          pagina: 1,
          recordsPorPagina: 5
        }
      });
      console.log("Haciendo el Get Respuesta: "+JSON.stringify(response.data, null, 2));
                  // Procesamiento de la respuesta
                  console.log('Datos recibidos del API:', response.data);
                  //Mete la respuesta a la variable de
                  setRespuestaData(response.data)
    } catch (error) {
      
    }
  }
   fetchData(); 
  },[]);

  // Extracción y presentación básica sin diseño
  return(
  <>
  <h3>
    Probando Conexion Axios
  </h3>
  <hr/>
    {respuestaData.map((item) => (
    <div key={item.id} style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
      <h5>{item.nombre}</h5>
      <h5>{item.titular}</h5>
    </div>))}

  </>
  )
}

export default ProbandoConexion
