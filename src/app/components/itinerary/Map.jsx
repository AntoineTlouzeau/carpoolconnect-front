import { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import RoutingMachine from "./RoutingMachine";

const Map = ({ markers }) => {
    const rMachine = useRef();

    let bounds = [];

    bounds.push(markers.departure.geocode);
    bounds.push(markers.arrival.geocode);

    return (
        <MapContainer
            center={[46.990559, 2.40042]}
            bounds={bounds}
            boundsOptions={{ padding: [0, 23] }}
            zoomControl={false}
            dragging={false}
        >
            <RoutingMachine rMachine={rMachine} waypoints={bounds} />
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers markers={markers} />
        </MapContainer>
    );
};

export default Map;
