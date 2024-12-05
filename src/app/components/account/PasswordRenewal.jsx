import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { renewPassword } from "./../../api/backend/account";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import logo from "../../assets/image/logos/Logo1_HD.png"
/**
 * Formulaire renseignement nouveau mot de passe
 *
 * @author Emile Mistrot
 */
const PasswordRenewal = () => {
    

    const navigate = useNavigate();
    const { email, key } = useParams();

    const handlePasswordRenewal = (values) => {
        if (values.newPassword != values.newPasswordConfirmation) {
            setErrorFormLog(true);
            return;
        }

        let request = {
            password: values.newPassword,
            key: key,
            email: email,
        };

        renewPassword(request)
            .then((res) => {
                if (res.status === 200) {
                    navigate(URL_HOME);
                }
            })
            .catch(() => setErrorLog(true));
    };

    const renewalSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(4, "Mot de passe trop court")
            .max(64, "Mot de passe trop long")
            .required("Le nouveau mot de passe est obligatoire"),
        newPasswordConfirmation: Yup.string()
            .min(4, "Mot de passe trop court")
            .max(64, "Mot de passe trop long")
            .oneOf([Yup.ref('newPassword'), null], 'Les mots de passe ne correspondent pas')
            .required("La confirmation du mot de passe est obligatoire"),
    });

    return (
        <div className=" max-w-lg space-y-9 rounded-md bg-white p-4 py-12 px-6 shadow sm:px-6 lg:px-8 mx-auto">
            <div>
                <div className="flex justify-center">
                    <img
                        className="h-16 w-auto cursor-pointer sm:h-14"
                        src={logo}
                        alt=""

                    />
                </div>
                <h2 className="text-center mb-4 font-bold text-cobalt">
                    Entrez un nouveau mot de passe
                </h2>
            </div>

            <hr />

            <Formik
                initialValues={{
                    newPassword: "",
                    newPasswordConfirmation: "",
                }}
                validationSchema={renewalSchema}
                onSubmit={handlePasswordRenewal}
            >
                {({ isValid, dirty }) => (
                    <Form noValidate className="mt-8 space-y-6">
                        <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                            <div  className="mb-2">
                            <Field
                                type="password"
                                name="newPassword"
                                placeholder="Nouveau mot de passe*"
                                autoComplete="password"
                                className="input"
                            />
                            <ErrorMessage name="newPassword" >
                                {(msg) => <div className="text-xs italic text-red-600 absolute">{msg}</div>}
                            </ErrorMessage>
                            </div>
                            <div  className="mb-2">
                            <Field
                                type="password"
                                name="newPasswordConfirmation"
                                placeholder="Confirmation nouveau mot de passe*"
                                autoComplete="current-password"
                                className="input"
                            />
                            <ErrorMessage name="newPasswordConfirmation" >
                                {(msg) => <div className="text-xs italic text-red-600 absolute">{msg}</div>}
                            </ErrorMessage>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className={`w-full bg-emeraude hover:font-semibold hover:underline text-white py-2 px-4 rounded-full ${!isValid || !dirty
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                    }`}
                                disabled={!isValid || !dirty}

                            >
                                Confirmer
                            </button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PasswordRenewal;
