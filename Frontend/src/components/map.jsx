import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import '../../node_modules/leaflet/dist/leaflet.css';
import '../styles/map.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import axios from "axios"
import { useEffect, useState } from "react";

//imagenes
import minus from '../images/minus.png';
import getRutas from "../functions/getRutasByParadaId";

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



return(
    <div className="Mapa">
        <div className="seleccionador">

        </div>
            <MapContainer className="mapaObjeto" center={[40.463667, -3.74922]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
                {paradas.map((parada, index) =>{
                    return <Marker key={index} eventHandlers={{
                        click: (e) => {
                        getRutas(parada.idParada, setRutaSeleccionada)
                        },
                    }} position={[parada.latitud, parada.longitud]} icon={new Icon({ iconUrl: markerIconPng, iconAnchor: [13, 10] })}>
                    <Popup>
                        <div className="divPopup"  style={{height: "50vh", width: "auto"}}>
                            <div className="popupHeader">
                                <h2>Estacion de tren <b>{parada.nombreParada}</b></h2>
                                <p>Trenes disponibles</p>
                            </div>
                            <div className="insignias">
                                {[...new Set(rutaSelecionada.map(ruta => ruta.tipo))].map((tipo, index) => {
                                        return<img title={tipo.toUpperCase()} src={"/src/images/" + tipo + ".png"}  width={20.2} height={24.4} alt="icono Minusvalidos" />
                                })}
                                <img title={(parseInt(parada.accesoMinus) === 1) ? 'Acceso para minusválidos' : ''} src={minus} style={{ visibility: (parseInt(parada.accesoMinus) === 2) ? 'hidden' : 'visible' }} width={24.4} height={24.4} alt="icono Minusvalidos" />
                            </div>
                            <br></br>
                            <button>Seleccionar estacion de salida</button>
                        </div>
                    </Popup>

                    </Marker>
                })}
            </MapContainer>
</div>
);
}