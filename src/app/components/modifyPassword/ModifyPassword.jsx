import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { modifyPassword } from "./../../api/backend/account";
import Cadenas from "../../assets/Icônes/Icon_Padlock.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import Modal from 'react-modal';




/**
 * Formulaire modification du password
 * 
 * @author Anne Chebel
 */

const ModifyPassword = () => {


    const navigate = useNavigate();
    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",

    };
    const [error, setError] = React.useState(null);
    const store = useStore();
    const token = store.getState().auth.token;



    const dispatch = useDispatch();

    const handleSubmit = (values) => {

        console.log(values);
        if (values.newPassword !== values.confirmPassword) {
            setError(true);
            return;
        }

        let request =
        {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        };

        console.log(request)


        modifyPassword(request, token)
            .then((res) => {
                if (res.status === 200) {
                    navigate(URL_HOME);
                }
            })
            .catch(() => setError(true));


    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required("Champ obligatoire"),
        newPassword: Yup.string()
            .min(4, "Mot de passe trop court")
            .max(64, "Mot de passe trop long")
            .required("Champ obligatoire"),
        confirmPassword: Yup.string()
            .min(4, "Mot de passe trop court")
            .max(64, "Mot de passe trop long")
            .oneOf([Yup.ref("newPassword"), null], "Les mots de passe doivent correspondre")
            .required("Champ obligatoire")
    });


    return (
        <div className="delete-account-form-container">
            <div className="w-full space-y-9 rounded-md bg-white p-4 shadow">
                <div>
                    <div className="flex items-center justify-center">
                        <img
                            className="h-16 w-auto cursor-pointer mr-2 mb-1 sm:h-14"
                            src={Cadenas}
                            alt=""

                        />
                        <h3
                            className="text-center mb-2 font-bold text-cobalt"
                        >
                            Changer mon mot de passe
                        </h3>
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, dirty, values }) => (
                        <Form className="mt-8 space-y-6">
                            {/** Champ oldPassword actuel */}
                            <div className="mb-2">
                                <div>
                                    <Field
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        placeholder="Mot de passe actuel*"
                                        autoComplete="current-password"
                                        className="input"
                                    />
                                </div>
                                <ErrorMessage
                                    name="oldPassword"

                                >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute">{msg}</div>}
                                </ErrorMessage>
                            </div>


                            {/** Champ Nouveau password */}
                            <div className="mb-2">
                                <div >
                                    <Field
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="Nouveau mot de passe*"
                                        autoComplete="current-password"
                                        className="input"
                                    />
                                </div>
                                <ErrorMessage
                                    name="newPassword"
                                >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {/** Champ confirmer le nouveau mot de passe */}
                            <div className="mb-2">
                                <div>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirmer le nouveau mot de passe"
                                        autoComplete="current-password"
                                        className="input"
                                    />
                                </div>
                                <ErrorMessage
                                    name="confirmPassword"
                                >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute">{msg}</div>}
                                </ErrorMessage>

                                <div className="mb-4"></div>

                                {/** Button Changer le mot de passe  */}
                                <div className="flex items-center justify-center my-8">
                                    <button
                                        type="submit"
                                        onClick={() => navigate("/confirmation")}
                                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full`}
                                    >
                                        Changer de mot de passe
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default ModifyPassword;
