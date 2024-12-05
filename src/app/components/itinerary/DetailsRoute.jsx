import { useParams } from "react-router-dom";
import ItineraryCard from "./ItineraryCard";
import { useState } from "react";
import { useEffect } from "react";
import { getRoute } from "../../api/backend/route";
import AskReservationForm from "../reservations/AskReservationForm";
import ReservationSent from "../reservations/ReservationSent";

const DetailsRoute = () => {
    const params = useParams();
    const [route, setRoute] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [reservationSent, setReservationSent] = useState(false);

    function request() {
        getRoute(params.id).then((res) => {
            setRoute(res.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        request();
    }, [reservationSent]);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    const markers = {
        driver: route.driver.firstName + " " + route.driver.lastName,
        date: `${route.departureDate[2]}/${route.departureDate[1]}/${route.departureDate[0]}`,
        seats: `Places restantes: ${route.seats}`,
        departure: {
            geocode: [route.departure.latitude, route.departure.longitude],
            popUp: "Départ",
            city: route.departure.city,
        },
        arrival: {
            geocode: [route.destination.latitude, route.destination.longitude],
            popUp: "Arrivée",
            city: route.destination.city,
        },
    };

    return (
        <div className="h-screen flex justify-center">
            {reservationSent ? <ReservationSent /> : 
            <div className="h-5/6 w-1/2 space-y-9 rounded-md bg-white p-4 shadow my-8 mx-auto flex flex-col box-content">
                <h3 className="font-bold text-cobalt text-center">
                    Votre trajet
                </h3>
                <p className="text-center">
                    Visualisez votre itinéraire avant de prendre la route:
                </p>
                <div className="flex justify-center h-5/6">
                    <ItineraryCard markers={markers} />
                </div>
                <AskReservationForm
                    className={`flex items-center justify-center 
                    `}
                    route={route}
                    setReservationSent={setReservationSent}
                />
            </div>}
        </div>
    );
};

export default DetailsRoute;
