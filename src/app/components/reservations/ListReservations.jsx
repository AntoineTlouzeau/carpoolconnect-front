import { useEffect, useState } from "react";
import { getUserReservations } from "../../api/backend/reservation";
import { selectToken } from "../../redux-store/authenticationSlice";
import { useStore } from "react-redux";
import CancelReservationButton from "./CancelReservationButton";
import { useNavigate } from "react-router-dom";
import { URL_DETAIL_ROUTE } from "../../constants/urls/urlFrontEnd";
import profileIcon from "../../assets/Icônes/Icon_User.png";


const ListReservations = ({ page }) => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isReloading, setReloading] = useState(false);
    const token = selectToken(useStore().getState());
    const navigate = useNavigate();

    const request = () => {
        getUserReservations(page, token).then((res) => {
            setReservations(res.data);
            setLoading(false);
        });
    };

    const translateStatus = (status) => {
        switch (status) {
            case "WAITING":
                return <p>En attente de confirmation du conducteur</p>;
            case "CANCELED":
                return <p>Annulée</p>;
            case "DENIED":
                return <p>Refusée</p>;
            case "RESERVED":
                return <p>Confirmée</p>;
        }
    };

    useEffect(() => {
        request();
        console.log(page);
    }, [isReloading, page]);

    const list = reservations.map((reservation, index) => {
        return isLoading ? (
            <div className="text-center">Loading...</div>
        ) : (
            <li key={reservation.id} className="p-4">
                <div className="">
                    <div className="">
                        <h3 className="font-bold text-cobalt">
                            {reservation.route.departure.city}
                            {" -> "}
                            {reservation.route.destination.city}
                        </h3>
                        <ul className="list-disc mt-2 ml-8">
                            <li>
                                Conducteur : {reservation.route.driver.firstName}{" "}
                                {reservation.route.driver.lastName}{" "}
                            </li>
                            <li>
                                Date : {reservation.route.departureDate[2]}/
                                {reservation.route.departureDate[1]}/
                                {reservation.route.departureDate[0]}
                            </li>
                            <li>
                                {translateStatus(reservation.status)}
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-around">
                    <div className="rounded-full border-green-500 border-2 p-3 mt-3">
                                <img src={profileIcon} className="h-12 my-auto" />
                            </div>
                        <button
                            className=" bg-emeraude hover:bg-jade hover:text-black text-white my-auto m-4 py-2 px-4 rounded-full"
                            onClick={() =>
                                navigate(
                                    URL_DETAIL_ROUTE +
                                        `/${reservation.route.id}`
                                )
                            }
                        >
                            Détails du trajet
                        </button>
                        {reservation.status === "CANCELED" ||
                        page === "past" ? (
                            ""
                        ) : (
                            <>
                                <CancelReservationButton
                                    reservation={reservation}
                                    setReloading={setReloading}
                                />
                            </>
                        )}
                    </div>
                </div>
            </li>
        );
    });

    return reservations.length === 0 ? (
        <div>
            <p>Vous n'avez pas de réservation en attente</p>
        </div>
    ) : (
        <div className="">{list}</div>
    );
};

export default ListReservations;
