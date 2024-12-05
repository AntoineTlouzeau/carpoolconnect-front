import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import {
    URL_HOME,
    URL_LOGIN,
    URL_PROFILE,
    URL_REGISTER,
    URL_TRAJETS,
} from "../../constants/urls/urlFrontEnd";
import Logo from "../../assets/image/logos/Logo1_HD.png";
import SignOut from "../account/SignOut";
import profilIcon from "../../assets/Icônes/Icon_User.png";
import carIcon from "../../assets/SVG/Car.svg";

const Navbar = () => {
    const isLogged = useSelector(selectIsLogged);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const location = useLocation();

    const handleButtonClick = () => {
        setIsButtonActive(!isButtonActive);
    };

    return (
        <div className="absolute mx-auto w-full bg-white px-4 shadow-sm sm:px-6">
            <div className="flex items-center justify-between py-1 sm:justify-start sm:space-x-10">
                <div>
                    <Link to={URL_HOME}>
                        {/** Logo  */}
                        <img
                            className="h-8 w-auto cursor-pointer sm:h-10"
                            src={Logo}
                            width="200"
                            height="60"
                        />
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end lg:w-0">
                    <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                        <Link
                            to={URL_HOME}
                            className="text-green-500 font-poppins text-base font-normal leading-6"
                        >
                            <div>Accueil</div>
                        </Link>
                        <Link className="text-green-500 font-poppins text-base font-normal leading-6">
                            <div>A propos</div>
                        </Link>
                        {/* <Link
                            to={URL_ROUTE}
                            className="text-green-500 font-poppins text-base font-normal leading-6"
                        >
                            <div>Covoiturer au quotidien</div>
                        </Link> */}
                        {isLogged ? (
                            <>
                                {/* <Link
                                    to={URL_LOGIN}
                                    className="text-green-500 font-poppins text-base font-normal leading-6"
                                >
                                    <div>Abonnement</div>
                                </Link> */}
                                <div className={`border-green-500 rounded-3xl border-2 px-4 py-1 ${location.pathname === URL_TRAJETS ? "bg-jade" : ""}`}>
                                    <Link
                                        to={URL_TRAJETS}
                                        className="text-green-500 font-poppins text-base font-normal leading-6"
                                    >
                                        <div className="flex">
                                            <img
                                                src={carIcon}
                                                className="h-5 my-auto mr-2"
                                            />
                                            <div>Mes trajets</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={`border-green-500 rounded-3xl border-2 px-4 py-1 ${location.pathname === URL_PROFILE ? "bg-jade" : ""}`}>
                                    <Link
                                        to={URL_PROFILE}
                                        className="text-green-500 font-poppins text-base font-normal leading-6 "
                                    >
                                        <div className="flex">
                                            <img
                                                src={profilIcon}
                                                className="h-5 my-auto mr-2"
                                            />
                                            <div>Mon profil</div>
                                        </div>
                                    </Link>
                                </div>
                                <SignOut />
                            </>
                        ) : (
                            <>
                                <Link
                                    to={URL_LOGIN}
                                    className={`font-poppins text-base font-normal leading--6 ${
                                        !isButtonActive
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    <button
                                        className={`w-full bg-${
                                            !isButtonActive
                                                ? "green-600"
                                                : "white"
                                        } focus:bg-green-500 active:bg-green-600 py-2 px-4 rounded-full `}
                                        onClick={handleButtonClick}
                                    >
                                        Connexion
                                    </button>
                                </Link>
                                <Link
                                    to={URL_REGISTER}
                                    className={`font-poppins text-base font-normal leading--6 ${
                                        isButtonActive
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    <button
                                        className={`w-full bg-${
                                            isButtonActive
                                                ? "green-600"
                                                : "white"
                                        } focus:bg-green-500 active:bg-green-600 py-2 px-4 rounded-full border `}
                                        onClick={handleButtonClick}
                                    >
                                        Inscription
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
