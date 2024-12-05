import { useEffect, useState } from "react";
import { getAwaitingReservation } from "../../api/backend/reservation";
import RowReservations from "./RowReservations";
import { useStore } from "react-redux";

const ListAwaitingReservation = () => {
    const token = useStore().getState().auth.token;
    const [isReloading, setReloading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setLoading] = useState(true);

    function request() {
        getAwaitingReservation(token)
            .then((res) => {
                if (res.status === 200) {
                    setReservations(res.data);
                    setLoading(false);
                }
            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        request();
    }, [isReloading]);

    const renderedList = reservations.map((reservation, index) => {
        return isLoading ? (
            <div className="text-center">Loading...</div>
        ) : (
            <li key={reservation.id} className="mb-4 ml-2">
                <RowReservations reservation={reservation} index={index} isReloading={isReloading} setReloading={setReloading}/>
            </li>
        );
    });

    return reservations.length === 0 ? (
        <div>
            <p>Vous n'avez pas de réservation en attente</p>
        </div>
    ) : (
        <div>{renderedList}</div>
    );
};

export default ListAwaitingReservation;
