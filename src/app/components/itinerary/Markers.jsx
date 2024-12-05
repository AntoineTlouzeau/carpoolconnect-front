import { Marker, Popup } from "react-leaflet";

const Markers = ({ markers }) => {
    return (
        <>
            <Marker
                position={markers.departure.geocode}
                key={markers.departure.popUp}
            >
                <Popup>{markers.departure.popUp}</Popup>
            </Marker>
            <Marker
                position={markers.arrival.geocode}
                key={markers.arrival.popUp}
            >
                <Popup>{markers.arrival.popUp}</Popup>
            </Marker>
        </>
    );
};

export default Markers;
