import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link} from "react-router-dom";
import * as yup from "yup";
import { passwordForgotten } from "../../api/backend/account";

const ForgotPassword = () => {
    const [errorEmail, setErrorEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .email("email invalide")
            .required("Champ obligatoire"),
    });

    const initialValues = {
        email: "",
    };

    const handleResetPassword = (values) => {
        passwordForgotten(values)
            .then((res) => {
                if (res.status === 200) {
                    setEmailSent(true);
                }
            })
            .catch(() => {
                setEmailSent(true);
            });
    };

    return (
        <div className=" mx-auto w-full max-w-lg space-y-9 rounded-md bg-white p-4 py-12 px-6 shadow sm:px-6 lg:px-8">
            {!emailSent && (
                <div>
                    <div className="flex justify-center">
                        <h2
                            className="text-center mb-4 text-base text-cobalt"

                        >
                            Mot de passe oublié ?
                        </h2>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleResetPassword}
                        validationSchema={loginSchema}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="mt-8 space-y-6">
                                <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                                    <p className="text-base">
                                        Si vous avez oublié votre mot de passe,
                                        veuillez saisir votre adresse e-mail
                                        ci-dessous. Nous vous enverrons un
                                        e-mail avec des instructions pour
                                        réinitialiser votre mot de passe.
                                    </p>

                                    <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                                        <div className="mb-2">
                                            <Field
                                                type="text"
                                                name="email"
                                                placeholder="Email*"
                                                autoComplete="email"
                                                className="input"
                                            />
                                        
                                        <ErrorMessage
                                            name="email"
                                            
                                        >
                                            {(msg) => (
                                                <div
                                                className="text-xs italic text-red-600 absolute"
                                                >
                                                    {msg}
                                                </div>
                                            )}
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
                                            Récupérer mon mot de passe
                                        </button>
                                    </div>
                                    <p className="text-sm">
                                        Vous vous souvenez de votre mot de passe
                                        ? Retour à la page de connexion
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <Link
                                            to="/login"
                                            className="text-sm text-emeraude underline"
                                        >
                                            Se connecter
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="text-sm text-emeraude underline"
                                        >
                                            S'inscrire
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {errorEmail && (
                        <div >
                            <small className="text-sm italic text-red-600">
                                Cette adresse mail ne correspond à aucun
                                utilisateur
                            </small>
                        </div>
                    )}
                </div>
            )}
            {emailSent && (
                <div>
                    <p className="text-base">
                        Un email vous a été envoyé, veuillez vérifier votre
                        boite mail
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            to="/"
                            className="text-sm text-emeraude underline"
                        >
                            Page d'accueil
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
