import { useEffect, useState } from 'react'
import { adscripcionDTO } from './adscripciones/adscripciones.model'
import axios, { AxiosResponse } from 'axios'
import './Styles.css'

const IndiceAdscripciones=()=> {

  //const [respuestaData, setRespuestaData] = useState<adscripcionDTO[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {

        // Petición con manejo de errores
         const response: AxiosResponse<adscripcionDTO[]> = await axios.get('https://localhost:7167/adscripciones', {
          // params: {
          //   pagina: 1,
          //   recordsPorPagina: 5
          // }
        });
        console.log("Haciendo el Get Respuesta: "+JSON.stringify(response.data, null, 2));

        // Procesamiento de la respuesta
        //console.log('Datos recibidos del API:', response.data);
        //setRespuestaData(response.data)

        //console.log('Status:', response.status);
        //console.log('Headers recibidos:', response.headers);

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


return (
<>
<div >
  <h3>Ejemplo de uso de Axios</h3>
</div>    
<hr/>
{/* <ul>
        {respuestaData.map((adscripcion) => (
          <li key={adscripcion.id}>{adscripcion.nombre}</li>
        ))}
</ul> */}

</>
  )
}

export default IndiceAdscripciones
