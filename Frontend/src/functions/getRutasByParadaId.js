import axios from "axios"

export default function getData(idParada, setState){
    console.log("Has clickado en parada con id " + idParada)
    axios.get(import.meta.env.VITE_API_URL + `/rutas/getRutasByParadaId/${idParada}`).then(response => {
        if(response.data?.rutas){
            setState(response.data.rutas);
            console.log("rutas recibidas")
        }
    }).catch(error => {
        console.error("Error al obtener las rutas:", error);
    });
}