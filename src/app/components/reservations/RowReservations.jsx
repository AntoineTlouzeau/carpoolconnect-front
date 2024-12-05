import { useEffect, useState } from "react";
import { getAvailableSeats } from "../../api/backend/route";
import DenyReservationButton from "./DenyReservationButton";
import AcceptReservationButton from "./AcceptReservationButton";

const RowReservations = ({ reservation, index, isReloading, setReloading }) => {
    const [seats, setSeats] = useState(0);

    const availableSeats = (route) => {
        getAvailableSeats(route)
            .then((res) => {
                setSeats(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        availableSeats(reservation.route);
    }, [isReloading]);

    return seats === 0 ? (
        ""
    ) : (
        <div className="">
            <h3 className="font-bold text-cobalt">
                {reservation.route.departure.city}
                {" -> "}
                {reservation.route.destination.city}
            </h3>
            <ul className="list-disc mt-2 ml-8">
                <li>
                    {reservation.user.firstName.charAt(0).toUpperCase() +
                        reservation.user.firstName.slice(1) +
                        " " +
                        reservation.user.lastName.charAt(0).toUpperCase() +
                        reservation.user.lastName.slice(1)}
                </li>
                <li>
                    {reservation.route.departure.city +
                        " -> " +
                        reservation.route.destination.city}
                </li>
                <li>
                    Le{" "}
                    {reservation.route.departureDate[2] +
                        "/" +
                        reservation.route.departureDate[1] +
                        "/" +
                        reservation.route.departureDate[0]}{" "}
                    à{" "}
                    {String(reservation.route.departureDate[3]).padStart(
                        2,
                        "0"
                    ) +
                        "h" +
                        String(reservation.route.departureDate[4]).padStart(
                            2,
                            "0"
                        )}
                </li>
                <li> Places restantes : {seats}</li>
            </ul>
            <div className="flex items-center justify-center">
                <AcceptReservationButton
                    reservation={reservation}
                    setReloading={setReloading}
                />
                <DenyReservationButton
                    reservation={reservation}
                    setReloading={setReloading}
                />
            </div>
        </div>
    );
};

export default RowReservations;
