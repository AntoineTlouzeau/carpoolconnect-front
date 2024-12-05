import ListAwaitingReservation from "./ListAwaitingReservations";
import carIcon from "../../assets/SVG/Car.svg";

const ReservationsWaiting = () => {
    return (
        <div className="pt-4 divide-y-2 divide-stone-500">
            <div className="flex items-center justify-center">
                <img className="h-12 mb-4 ml-16 mr-4" src={carIcon} />
                <h3 className="text-cobalt font-bold mb-4 text-center">
                    Réservations en attente
                </h3>
            </div>
            <div
                style={{
                    height: "34rem",
                }}
                className="overflow-auto"
            >
                <ul className="m-4 h-full">
                    <ListAwaitingReservation />
                </ul>
            </div>
        </div>
    );
};

export default ReservationsWaiting;
