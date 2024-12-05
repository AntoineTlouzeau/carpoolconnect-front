import React from "react";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import FondEcran from "../../assets/images/Illustration_4.png";

/**
 * Confirmation de la modification du mot de passe
 * 
 * @author Anne Chebel
 */

const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <div className="delete-account-form-container flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${FondEcran})` }}>
            <div className="max-w-2xl rounded-md p-4 py-12 px-6 shadow sm:px-6 lg:px-8 bg-white rounded-lg text-center">
                <h2 className="font-bold text-cobalt mb-4">Félicitations ! Votre mot de passe a été modifié</h2>
                <div className="flex items-center justify-center mb-4">
                    <img
                        className="w-full h-auto rounded"
                        src={FondEcran}
                        alt=""
                    />
                </div>
                <p className="text-black">Bravo ! Vous venez de renforcer la sécurité de votre compte avec succès.
                    Votre nouveau mot de passe est maintenant en place, vous assurant une expérience
                    en ligne plus sécurisée. Continuez à profiter de nos services en toute
                    confiance.  </p>
                <div className="flex items-center justify-center mt-4">
                    <button
                        type="submit"
                        onClick={() => navigate(URL_LOGIN)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Retour au profil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;

