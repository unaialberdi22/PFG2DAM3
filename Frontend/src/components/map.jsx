import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import '../../node_modules/leaflet/dist/leaflet.css';
import '../styles/map.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import axios from "axios"
import { useEffect, useState } from "react";

export default function Map() {

const [paradas, setParadas] = useState([])    

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
    <MapContainer center={[40.463667, -3.74922]} zoom={6} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        {paradas.map((parada, index) =>{
            return <Marker key={index} position={[parada.latitud, parada.longitud]} icon={new Icon({ iconUrl: markerIconPng, iconAnchor: [13, 10] })}>
            <Popup>
                <div></div>
                <p>id estacion: {parada.idParada}</p>
                <h3>{parada.nombreParada}</h3>
            </Popup>

            </Marker>
        })}
        <Marker position={[40.463667, -3.74922]}>
            <Popup>
                AL LORO
            </Popup>
        </Marker>
    </MapContainer>
</div>
);
}