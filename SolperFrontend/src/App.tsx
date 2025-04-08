import { useEffect } from "react";



const App = ()=>{

    useEffect(()=>{
        fetch('https://localhost:7167/test-cors')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('CORS Error:', error));
      },[])

    return(
        <>
        <h3>Probando Cors</h3>
        </>
    )
}
export default App