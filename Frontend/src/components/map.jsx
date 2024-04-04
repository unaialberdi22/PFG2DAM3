import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import '../../node_modules/leaflet/dist/leaflet.css';
import '../styles/map.css';

export default function Map() {

return(
    <div className="Mapa">
    <MapContainer center={[40.463667, -3.74922]} zoom={6} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[40.463667, -3.74922]}>
            <Popup>
                Españita
            </Popup>
        </Marker>
    </MapContainer>
</div>
);
}