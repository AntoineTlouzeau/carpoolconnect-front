import ReservationsWaiting from "../components/reservations/ReservationsWaiting";

const ReservationsWaitingView = () => {
    return (
        <div className="justify-center h-screen">
            <div className="max-w-lg space-y-9 rounded-xl bg-white shadow my-8 mx-auto border-2 border-stone-500">
                <ReservationsWaiting />
            </div>
        </div>
    );
};

export default ReservationsWaitingView;
