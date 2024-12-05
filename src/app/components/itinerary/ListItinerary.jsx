import { useEffect, useState } from "react";
import { getRoutePage } from "../../api/backend/route";
import { selectToken } from "../../redux-store/authenticationSlice";
import { useStore } from "react-redux";
import profileIcon from "../../assets/Icônes/Icon_User.png";
import { useNavigate } from "react-router-dom";
import { URL_DETAIL_ROUTE } from "../../constants/urls/urlFrontEnd";

const ListItinerary = ({ currentPage }) => {
    const token = selectToken(useStore().getState());
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    const request = () => {
        getRoutePage(currentPage, token)
            .then((result) => {
                setList(result.data);
                setLoading(false);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        request();
    }, [currentPage]);

    return list.map((route, index) => {
        return isLoading ? (
            <div className="text-center">Loading...</div>
        ) : (
            <li key={route.id} className="mb-4 ml-2">
                    <h3 className="font-bold text-cobalt">
                        {route.departure.city} {"->"} {route.destination.city}
                    </h3>
                    <ul className="list-disc mt-2 ml-8">
                        <li className="my-1">
                            Date : {route.departureDate[2]}/
                            {route.departureDate[1]}/{route.departureDate[0]}
                        </li>
                        <li className="my-1">
                            Adresse de départ :{" "}
                            {route.departure.number !== 0
                                ? route.departure.number + ", "
                                : ""}
                            {route.departure.street != null
                                ? route.departure.street + ", "
                                : ""}
                            {route.departure.city}
                        </li>
                        <li className="my-1">
                            Adresse d'arrivée :{" "}
                            {route.destination.number !== 0
                                ? route.destination.number + ", "
                                : ""}
                            {route.destination.street != null
                                ? route.destination.street + ", "
                                : ""}
                            {route.destination.city}
                        </li>
                        <li className="my-1">Points gagnés : 50 points</li>

                        <div className="flex mt-6 justify-around">
                            <div className="rounded-full border-green-500 border-2 p-3">
                                <img src={profileIcon} className="h-14" />
                            </div>
                            <button
                                className="bg-emeraude hover:bg-jade hover:text-black m-4 py-2 px-4 rounded-full text-white"
                                onClick={() =>
                                    navigate(URL_DETAIL_ROUTE + `/${route.id}`)
                                }
                            >
                                Détails du trajet
                            </button>
                        </div>
                    </ul>
            </li>
        );
    });
};

export default ListItinerary;
