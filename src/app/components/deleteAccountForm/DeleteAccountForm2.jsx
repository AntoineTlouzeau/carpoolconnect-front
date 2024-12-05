import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import corbeille from "../../assets/image/logos/Icon_Bin.png";
import { deleteAccount } from "../../api/backend/account";
// IMAGE FOND ECRAN
import ImageEcran from "../../assets/images/illu_background.png";
import { useDispatch, useStore } from "react-redux";
import { signOut } from "../../redux-store/authenticationSlice";
import Modal from "react-modal";
import styled from "styled-components";
import PoPup from "./poPup";

/**
 * Formulaire suppression de compte
 *
 * @author Anne Chebel
 */

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Format d'email invalide")
        .required("Champ obligatoire"),
    password: Yup.string().required("Champ obligatoire"),
    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password"), null],
            "Les mots de passe doivent correspondre"
        )
        .required("Champ obligatoire"),
    optionalText: Yup.string(),
});

const DeleteAccountForm = () => {
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        optionalText: "",
    };
    const [error, setError] = React.useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const store = useStore();
    const token = store.getState().auth.token;
    const dispatch = useDispatch();

    const handleSubmit = () => {
        deleteAccount({ headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                console.log(
                    "Compte supprimé :" + `${store.getState().auth.user}`
                );
                setError(null);
                setSubmitting(false);
                dispatch(signOut());
                setIsModalVisible(true);
                // closeModal();  // Ferme la modal après la suppression du compte
                // history.push('/');  // Redirige vers la page d'accueil
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la suppression du compte :",
                    error
                );
                if (error.response) {
                    console.error(
                        "Statut d'erreur du serveur :",
                        error.response.status
                    );
                    console.error("Réponse du serveur :", error.response.data);
                    setError(
                        `Erreur du serveur: ${error.response.data.message}`
                    );
                } else {
                    setError(
                        "Erreur lors de la suppression du compte. Veuillez réessayer."
                    );
                }
                setSubmitting(false);
            });
    };

    return (
        <div className="delete-account-form-container">
            <div className="m-6 p-4">
                <div>
                    <div className="flex items-center justify-center">
                        <img
                            className="h-16 w-auto cursor-pointer sm:h-14 mr-2"
                            src={corbeille}
                            alt=""
                        />
                        <h3 className="text-center mb-4 font-bold text-cobalt">
                            Supprimer mon compte
                        </h3>
                    </div>
                </div>

                <p className="my-6">
                    Avant de supprimer définitivement votre compte notez que
                    toutes les données y compris vos trajets et points, seront
                    effacées de manières permanentes. Prenez le temps de
                    sauvegarder ce qui est important. Pour toutes assistances
                    contactez-nous. Merci
                </p>
                {/** Button Supprimer le compte  */}
                <div className="flex items-center justify-center">
                    <button
                        onClick={handleSubmit}
                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full

              }`}
                    >
                        Supprimer mon compte
                    </button>
                </div>
                {/** Modal */}
                <PoPup
                    isOpen={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                />
            </div>
        </div>
    );
};

export default DeleteAccountForm;
