import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";
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
const [estacionSeleccionada, setEstacionSeleccionada] = useState([]) 
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

useEffect(() => {
    console.log(estacionSeleccionada)
}, [estacionSeleccionada])

function getRutasByParadaId(idParada){
    console.log("Has clickado en parada con id " + idParada)
    axios.get(import.meta.env.VITE_API_URL + `/rutas/getRutasByParadaId/${idParada}`).then(response => {
        if(response.data?.rutas){
            setEstacionSeleccionada(response.data.rutas);
            console.log("rutas recibidas")
            console.log(response.data.rutas)
        }
    }).catch(error => {
        console.error("Error al obtener las rutas:", error);
    });
}
function MapClick() {
    useMapEvents({
      click(event) {
        setEstacionSeleccionada([])
      },
    });
  
    return null;
  }

  const tiposUnicos = [...new Set(estacionSeleccionada.map(ruta => ruta.tipo))];

return(
    <div className="Mapa">
        {estacionSeleccionada.length > 0 && (
            <div className="seleccionador">
                <h2 style={{color: "black"}}>Seleccione ruta</h2>

                {tiposUnicos.map((tipo, index) => (
                <div key={index}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
                        <h3 style={{color: "black"}}>{tipo}</h3>
                        <img title={tipo.toUpperCase()} src={"/src/images/" + tipo + ".png"}  width={46} height={53} alt="logo tipo tren" />
                    </div>

                    {estacionSeleccionada
                        .filter(r => r.tipo === tipo)
                        .map((ruta, i) => (
                            <button key={i} onClick={() => console.log("ruta " + ruta.idRuta + " clickada")}>
                            {ruta.idRuta}
                            </button>
                        ))}
                    <hr></hr>
                </div>

                ))}
            </div>
        )}
            <MapContainer id="mapaObjeto" center={[40.463667, -3.74922]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
                {paradas.map((parada, index) =>{
                    return <Marker key={index} eventHandlers={{
                        click: (e) => {
                        getRutasByParadaId(parada.idParada)
                        },
                    }} position={[parada.latitud, parada.longitud]} icon={new Icon({ iconUrl: markerIconPng, iconAnchor: [13, 10] })}>
                    <Popup>
                        <div className="divPopup"  style={{height: "50vh", width: "auto"}}>
                            <div className="popupHeader">
                                <h2>Estacion de tren <b>{parada.nombreParada}</b></h2>
                                <p><b>Trenes disponibles</b></p>
                            </div>
                            <div className="insignias">
                                {tiposUnicos.map((tipo, index) => {
                                        return<img title={tipo.toUpperCase()} src={"/src/images/" + tipo + ".png"}  width={20.2} height={24.4} alt="logo tipo tren" />
                                })}
                                <img title={(parseInt(parada.accesoMinus) === 1) ? 'Acceso para minusválidos' : ''} src={minus} style={{ visibility: (parseInt(parada.accesoMinus) === 2) ? 'hidden' : 'visible' }} width={24.4} height={24.4} alt="icono Minusvalidos" />
                            </div>
                            <hr></hr>
                            <div className="notas">
                                <p><b>Notas/Avisos</b></p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            
                        </div>
                    </Popup>

                    </Marker>
                })}
                <MapClick/>
            </MapContainer>
</div>
);
}

// function MapaClick() {
//     const map = useMapEvents({
//       click: () => {
//         console.log("mapa clickado")
//         map.locate()
//       },
//       locationfound: (location) => {
//         console.log('location found:', location)
//       },
//     })
//     return null
//   }