import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import '../../node_modules/leaflet/dist/leaflet.css';
import '../styles/map.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import axios from "axios"
import { useEffect, useState } from "react";

//imagenes
import minus from '../images/minus.png';

export default function Map() {

const [paradas, setParadas] = useState([])
const [rutaSelecionada, setRutaSeleccionada] = useState([])      

useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + '/paradas/getAllParadas').then(({
        data
    })=>{
        if(data?.stages){
            setParadas(data.stages)
        }
    })
}, [])    

function getData(idParada){
    console.log("Has clickado en parada con id " + idParada)
    axios.get(import.meta.env.VITE_API_URL + `/rutas/getRutasByParadaId/${idParada}`).then(response => {
        if(response.data?.rutas){
            setRutaSeleccionada(response.data.rutas);
            console.log("rutas recibidas")
        }
    }).catch(error => {
        console.error("Error al obtener las rutas:", error);
    });
}

return(
    <div className="Mapa">
    <MapContainer center={[40.463667, -3.74922]} zoom={6} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        {paradas.map((parada, index) =>{
            return <Marker key={index} eventHandlers={{
                click: (e) => {
                  getData(parada.idParada)
                },
              }} position={[parada.latitud, parada.longitud]} icon={new Icon({ iconUrl: markerIconPng, iconAnchor: [13, 10] })}>
            <Popup>
                <div>
                    <div className="popupHeader">
                        <h2>Estacion de tren <b>{parada.nombreParada}</b></h2>
                    </div>
                    <div className="insignias">
                        {[...new Set(rutaSelecionada.map(ruta => ruta.tipo))].map((tipo, index) => (
                                <p key={index}>{tipo}</p>
                        ))}
                        <img title={(parseInt(parada.accesoMinus) === 1) ? 'Acceso para minusválidos' : ''} src={minus} style={{ visibility: (parseInt(parada.accesoMinus) === 2) ? 'hidden' : 'visible' }} width={20} height={20} alt="icono Minusvalidos" />
                    </div>
                    <p>id estacion: {parada.idParada}</p>
                </div>
            </Popup>

            </Marker>
        })}
        {/* <Marker position={[40.463667, -3.74922]}>
            <Popup>
                AL LORO
            </Popup>
        </Marker> */}
    </MapContainer>
</div>
);
}