import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "./../../api/backend/account";

/**
 * Component Login
 *
 * Ce composant représente la page de connexion.
 * Il utilise Formik pour gérer le formulaire et les validations Yup pour la validation
 * Lorsque l'utilisateur  soumet le formulaire, il appelle la fonction handleLogin.
 * Cette fonction utilise l'API backend pour authentifier l'utilisateur.
 * Si l'authentification réussi, l'utilisateur est redirigé vers la page d'accueil.
 * @author Peter Mollet
 */

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Format d'email invalide")
        .required("Champ obligatoire"),
    password: yup.string().required("Champ obligatoire"),
});

const Login = () => {
    const [errorLog, setErrorLog] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = (values) => {
        authenticate(values)
            .then((res) => {
                if (res.status === 200 && res.data.token) {
                    // Authentification réussi, rediriger vers la page d'accueil
                    dispatch(signIn(res.data.token));
                    navigate(URL_HOME);
                }
            })
            .catch(() => setErrorLog(true));
    };

    return (
        <div className=" max-w-lg space-y-9 rounded-md bg-white p-4 py-12 px-6 shadow sm:px-6 lg:px-8 my-8 mx-auto">
            <div>
                <div className="flex justify-center">
                    <h2 className="text-center mb-4 font-bold text-cobalt">
                        Connectez-vous
                    </h2>
                </div>
                <p className="mt-5 text-center text-2xl font-extrabold text-gray-800">
                    Accédez à votre espace dédié
                </p>
            </div>

            <hr />

            <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={loginSchema}
            >
                {({ isValid, dirty }) => (
                    <Form className="mt-8 space-y-6">
                        <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                            {/** Champ Email */}
                            <div>
                                <Field
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email*"
                                    autoComplete="username"
                                    className="input"
                                />

                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <div className="text-xs italic text-red-600 absolute">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>

                        {/** Champ password */}
                        <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                            <div>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Mot de passe*"
                                    autoComplete="current-password"
                                    className="input"
                                />

                                <ErrorMessage name="password">
                                    {(msg) => (
                                        <div className="text-xs italic text-red-600 absolute">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>

                        {/** Button Se connecter  */}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className={`w-full bg-emeraude hover:font-semibold hover:underline text-white  py-2 px-4 rounded-full ${
                                    !isValid || !dirty
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={!isValid || !dirty}
                            >
                                Se connecter
                            </button>
                        </div>

                        {/** Pas encore de compte ? Inscrivez vous */}
                        <div className="mt-3 flex items-center justify-center text-sm">
                            <p>
                                Pas encore de compte?{" "}
                                <Link
                                    to="/register"
                                    className="text-emeraude underline "
                                >
                                    Inscrivez-vous
                                </Link>
                            </p>
                        </div>

                        {/** Bouton Mot de passe oublié  */}
                        <div className="mt-3 flex items-center justify-center ">
                            <div className="text-sm text-emeraude underline">
                                <Link to="/forgot-password">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
