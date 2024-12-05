import { useStore } from "react-redux";
import { denyReservation } from "../../api/backend/reservation";
import { selectToken } from "../../redux-store/authenticationSlice";

const DenyReservationButton = ({ reservation, setReloading }) => {

    const token = selectToken(useStore().getState())

    const handleDenyReservation = (reservation) => {
        setReloading(false);
        denyReservation(reservation, token)
            .then(() => {
                setReloading(true);
            })
            .catch((e) => console.log(e));
    };

    return (
        <button
            className="w-1/3 bg-emeraude hover:bg-jade hover:text-black text-white m-4 py-2 px-4 rounded-full"
            onClick={() => handleDenyReservation(reservation)}
        >
            Refuser la réservation
        </button>
    );
};

export default DenyReservationButton;
