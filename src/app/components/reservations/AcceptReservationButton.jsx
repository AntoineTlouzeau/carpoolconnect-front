import { useStore } from "react-redux";
import { acceptReservation } from "../../api/backend/reservation";
import { selectToken } from "../../redux-store/authenticationSlice";

const AcceptReservationButton = ({ reservation, setReloading }) => {
    
    const token = selectToken(useStore().getState())

    const handleAcceptReservation = (reservation) => {
        setReloading(false);
        acceptReservation(reservation, token)
            .then(() => {
                setReloading(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <button
            className="w-1/3 bg-emeraude hover:bg-jade hover:text-black text-white m-4 py-2 px-3 rounded-full"
            onClick={() => handleAcceptReservation(reservation)}
        >
            Accepter la réservation
        </button>
    );
};

export default AcceptReservationButton;