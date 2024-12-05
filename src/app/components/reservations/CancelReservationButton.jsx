import { useStore } from "react-redux";
import { selectToken } from "../../redux-store/authenticationSlice";
import { cancelReservation } from "../../api/backend/reservation";

const CancelReservationButton = ({ reservation, setReloading }) => {
    const token = selectToken(useStore().getState());

    const handleCancelReservation = (reservation) => {
        setReloading(false);
        cancelReservation(reservation, token)
            .then(() => {
                setReloading(true);
            })
            .catch((e) => console.log(e));
    };

    return (
        <button
            className=" bg-emeraude hover:bg-jade hover:text-black text-white my-auto m-4 py-2 px-4 rounded-full"
            onClick={() => handleCancelReservation(reservation)}
        >
            Annuler la réservation
        </button>
    );
};

export default CancelReservationButton;
