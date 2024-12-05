import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import { URL_ADMIN_HOME } from "../constants/urls/urlFrontEnd";
import { selectHasRole } from "../redux-store/authenticationSlice";

import BANNIERE_ILLU from "../assets/images/banner_img.png";
import HOME_TEXT_IMAGE from "../assets/images/illu_homepage.jpg";
import BarreRecherche from "../components/homepage/BarreRecherche";
import ItineraryCard from "../components/itinerary/ItineraryCard";
import SearchBar from "../components/homepage/SearchBar";

const HomeView = () => {
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const navigate = useNavigate();

    const marker1 = {
        driver: "Guy Marcheterre",
        date: "09/01/2024",
        departure: {
            geocode: [50.633333, 3.066667],
            popUp: "Départ",
            city: "Lille",
        },
        arrival: {
            geocode: [50.283333, 2.783333],
            popUp: "Arrivée",
            city: "Arras",
        },
    };

    const marker2 = {
        driver: "Lucie Blanchard",
        date: "05/01/2024",
        departure: {
            geocode: [49.417816, 2.826145],
            popUp: "Départ",
            city: "Compiegne",
        },
        arrival: {
            geocode: [49.900002, 2.3],
            popUp: "Arrivée",
            city: "Amiens",
        },
    };

    const marker3 = {
        driver: "Hervé Lalonde",
        date: "07/01/2024",
        departure: {
            geocode: [43.3, 5.4],
            popUp: "Départ",
            city: "Marseille",
        },
        arrival: {
            geocode: [47.466671, -0.563166],
            popUp: "Arrivée",
            city: "Angers",
        },
    };

    const marker4 = {
        driver: "Christine Dufour",
        date: "11/01/2024",
        arrival: {
            geocode: [49.258329, 4.031696],
            popUp: "Départ",
            city: "Reims",
        },
        departure: {
            geocode: [48.5734053, 7.7521113],
            popUp: "Arrivée",
            city: "Strasbourg",
        },
    };

    return (
        <div>
            <img src={BANNIERE_ILLU} alt="" />
            <h2 className="font-bold text-primary text-center m-3">
                Explorez, Partagez, Covoiturez avec UPool
            </h2>
            <SearchBar/>

            <div className="flex m-8">
                <div className="w-1/2 aspect-square flex flex-col justify-around">
                    <img src={HOME_TEXT_IMAGE} className=""></img>
                </div>
                <div className="m-8 w-1/2">
                    <h3 className="object-fill">
                        Bienvenue sur UPool - <br />
                        L'avenir du Covoiturage Intelligent !
                    </h3>
                    <p className="my-3">
                        Ici, covoiturer devient une expérience sans tracas
                        financier. Gagnez des points en conduisant, utilisez-les
                        pour vos trajets. À l'inscription, vous avez 50 points
                        gratuits. Pas de voiture ? Achetez des points. Vous
                        pouvez même vendre les vôtres. Transformons ensembles
                        chaque trajet en une aventure partagée. Rejoignez-nous
                        maintenant !
                    </p>
                    <button className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                        <Link>A propos</Link>
                    </button>
                </div>
            </div>

            <div>
                <h3 className="m-8">
                    En Route: Découvrez les Trajets les Plus Récents
                </h3>
                <div>
                <div className="content-center">
                    <div className="flex h-96 m-8 p-3 justify-between">
                        <div></div>
                        <ItineraryCard markers={marker1} className="mx-2"/>
                        <ItineraryCard markers={marker2} className="mx-2"/>
                        <ItineraryCard markers={marker3} className="mx-2"/>
                        <ItineraryCard markers={marker4} className="mx-2"/>
                    </div>
                </div>
                </div>
            </div>

            {isAdmin && (
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(URL_ADMIN_HOME)}
                >
                    Admin
                </button>
            )}
        </div>
    );
};

export default HomeView;
