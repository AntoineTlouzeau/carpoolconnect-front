import { Link } from "react-router-dom";

const ReservationSent = () => {
    return (
        <div className="flex justify-center">
            <div className="h-1/5 w-1/2 space-y-9 rounded-md bg-white p-4 shadow my-8 mx-auto flex flex-col justify-center box-content">
                <div className="text-center">
                    <h3 className="font-bold text-cobalt text-center">
                        Réservation envoyée
                    </h3>
                    <br></br>
                    <p>
                        Votre demande de réservation a été envoyée au conducteur
                    </p>
                    <br></br>
                    <Link to={"/"} className="underline">
                        Retour à la page d'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReservationSent;
