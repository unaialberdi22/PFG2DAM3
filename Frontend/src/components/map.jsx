import { MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import '../../node_modules/leaflet/dist/leaflet.css';
import '../styles/map.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import axios from "axios"
import { useEffect, useState } from "react";

//imagenes
import minus from '../images/minus.png';
import logo from '../images/RENFE.png';

export default function Map() {
const [paradas, setParadas] = useState([])
const [estacionSeleccionada, setEstacionSeleccionada] = useState([]) 
const [rutaSelecionada, setRutaSeleccionada] = useState([])  
const [paradaSeleccionada, setParadaSeleccionada] = useState([])
    

useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + '/paradas/getAllParadas').then(({
        data
    })=>{
        if(data?.stages){
            setParadas(data.stages)
        }
    })
}, [])

function getRutasByParadaId(parada){
    setRutaSeleccionada([])
    console.log("dentro parada")
    setParadaSeleccionada(parada)
    axios.get(import.meta.env.VITE_API_URL + `/rutas/getRutasByParadaId/${parada.idParada}`).then(response => {
        if(response.data?.rutas){
            setEstacionSeleccionada(response.data.rutas);
            console.log("rutas recibidas")
            console.log(response.data.rutas)
        }
    }).catch(error => {
        console.error("Error al obtener las rutas:", error);
    });
}

function getHorariosByRutas(ruta, idParada){
    setRutaSeleccionada([]);
    console.log(ruta)
    console.log(idParada)
    axios.get(import.meta.env.VITE_API_URL + `/horarios/getSelectedHorarios/${ruta}/${idParada}`).then(response => {
        if(response.data?.horarios){
            console.log(response.data, "dentro response")
            setRutaSeleccionada(response.data.horarios);
            console.log(rutaSelecionada,"horarios recibidos")
        }
    }).catch(error => {
        console.error("Error al obtener las rutas:", error);
    });
}

const tiposUnicos = [...new Set(estacionSeleccionada.map(ruta => ruta.tipo))];

const horariosEstacionSeleccionada = rutaSelecionada.filter(
    (horario) => horario.idParada === paradaSeleccionada.idParada
);

horariosEstacionSeleccionada.sort((a, b) => {
    const horaSalidaA = new Date(`01/01/2000 ${a.horaSalida}`);
    const horaSalidaB = new Date(`01/01/2000 ${b.horaSalida}`);
    return horaSalidaA - horaSalidaB;
});

const viajeMasLargo = rutaSelecionada.length > 0 ? rutaSelecionada.reduce((viajeAnterior, viajeActual) => {
    return viajeAnterior.seqParada > viajeActual.seqParada ? viajeAnterior : viajeActual;
}) : null;

const horariosViajeMasLargo = rutaSelecionada.filter((horario) => horario.idViaje === viajeMasLargo.idViaje);

const horariosViajeMasLargoOrdenado = horariosViajeMasLargo.sort((a, b) => {
  return parseInt(a.seqParada) - parseInt(b.seqParada);
});

const coordenadas = horariosViajeMasLargoOrdenado.map(horario => [parseFloat(horario.latitud), parseFloat(horario.longitud)]);

let primerNombreParada = '';
let ultimaNombreParada = '';

if(horariosViajeMasLargoOrdenado.length > 0){
const primerParada = horariosViajeMasLargoOrdenado[0];
const ultimaParada = horariosViajeMasLargoOrdenado[horariosViajeMasLargoOrdenado.length - 1];
console.log(primerParada)
primerNombreParada = paradas.find(parada => parada.idParada === primerParada.idParada)?.nombreParada;
ultimaNombreParada = paradas.find(parada => parada.idParada === ultimaParada.idParada)?.nombreParada;
}
return(
    <div className="Mapa">
        <div className="logo">
            <img title={"Logo Renfe"} onClick={() => window.open('https://www.renfe.com/es/es', '_blank')} src={logo} width={200} height={90}/>
        </div>
        {estacionSeleccionada.length > 0 && (
            <div className="seleccionador">
                <h2 style={{color: "black"}}>Estacion de tren {paradaSeleccionada.nombreParada}</h2>
                <h3 style={{color: "black"}}>Seleccione ruta</h3>

                {tiposUnicos.map((tipo, index) => (
                console.log(tipo.toUpperCase()),
                <div key={index}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
                        <h3 style={{color: "black"}}>{tipo}</h3>
                        <img title={tipo.toUpperCase()} src={"/src/images/" + tipo.toUpperCase() + ".png"}  width={46} height={53} alt="logo tipo tren" />
                    </div>

                    {estacionSeleccionada
                        .filter(r => r.tipo === tipo)
                        .map((ruta, i) => (
                            <button key={i} onClick={() => getHorariosByRutas(ruta.idRuta, paradaSeleccionada.idParada)}>
                            {ruta.idRuta}
                            </button>
                        ))}
                    <hr></hr>
                </div>

                ))}
            </div>
        )}
        {rutaSelecionada.length > 0 && (
            <div className="horarios">
                {console.log(horariosViajeMasLargoOrdenado)}
                <h2 style={{color: "black"}}>{primerNombreParada} - {ultimaNombreParada}</h2>
                <div className="divHorario">
                    <p><b>ID Viaje</b></p>
                    <p><b>Hora Salida</b></p>
                </div>
                {horariosEstacionSeleccionada.map((horario, index) => (
                    <div className="divHorario" key={index}>
                        <p>{horario.idViaje.substring(0, 6)}</p>
                        <p>{horario.horaSalida}</p>
                    </div>
                ))}
            </div>
        )}
            <MapContainer id="mapaObjeto" center={[40.463667, -3.74922]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
                {coordenadas.length > 0 && 
                <Polyline positions={coordenadas} color="#880063" weight={6}/>
                }
                {paradas.map((parada, index) =>{
                    return <Marker key={index} title={parada.nombreParada} eventHandlers={{
                        click: (e) => {
                            console.log(parada)
                            getRutasByParadaId(parada)
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
                                        return<img title={tipo.toUpperCase()} key={index} src={"/src/images/" + tipo.toUpperCase() + ".png"}  width={20.2} height={24.4} alt="logo tipo tren" />
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
                {/* <MapClick/> */}
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