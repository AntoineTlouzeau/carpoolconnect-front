import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../api/backend/account";
import { Link, useNavigate } from "react-router-dom";




const Inscription = () => {

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        lastName: Yup.string()
            .required("Le nom est obligatoire"),
        firstName: Yup.string()
            .required('Le prénom est obligatoire'),
        dateOfBirth: Yup.date()
            .required('La date de naissance est obligatoire')
            .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Vous devez avoir plus de 18 ans"),
        email: Yup.string().email('Adresse e-email non valide').required('L\'adresse e-email est obligatoire'),
        phoneNumber: Yup.string()
            .matches(/^(06|07)\d{8}$/, 'Numéro de téléphone non valide')
            .required('Le numéro de téléphone est obligatoire'),
        password: Yup.string()
            .min(6, 'Le mot de passe doit avoir au moins 6 caractères')
            .max(64, "Mot de passe trop long")
            .required('Le mot de passe est obligatoire'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
            .required('La confirmation du mot de passe est obligatoire'),
    });


    const handleInscription = (values) => {
        const { confirmpassword, ...dataToSend } = values;
        register(dataToSend).then((res) => {
            if (res.status === 200) {
                navigate("/");
            }
        })

    };

    return (
        <div className="max-w-lg space-y-9 mx-auto bg-white p-4 py-12 px-6 shadow sm:px-6 lg:px-8 rounded-md my-8 ">
            <div >
                <h2 className="text-cobalt font-bold mb-4 text-center">Inscrivez-vous maintenant</h2>
                <div className="mb-4 text-base text-center ">
                    <p>Rejoignez la communauté du covoiturage astucieux !</p>
                </div>

            </div>

            <hr />


            <Formik
                initialValues={{
                    lastName: "",
                    firstName: "",
                    dateOfBirth: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmpassword: ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleInscription}

            >
                {({ isValid, dirty }) => (
                    <Form noValidate className="mt-8 space-y-6">
                        <div className="flex flex-col space-y-6 rounded-md shadow-sm">
                            <div className="">
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Nom*"
                                    className="input"



                                />
                                <ErrorMessage name="lastName" >
                                    {(msg) => <div className="text-xs italic text-red-600  absolute ">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="Prénom*"
                                    className="input"

                                />
                                <ErrorMessage name="firstName">
                                    {(msg) => <div className="text-xs italic text-red-600 absolute ">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <Field
                                    type="date"
                                    name="dateOfBirth"
                                    placeholder="Date de naissance*"
                                    className="input"


                                />
                                <ErrorMessage name="dateOfBirth" >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute">{msg}</div>}
                                </ErrorMessage></div>
                            <div className="mb-2">
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email*"
                                    className="input "

                                />
                                <ErrorMessage name="email" >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute ">{msg}</div>}
                                </ErrorMessage></div>
                            <div className="mb-2">
                                <Field
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Numéro de téléphone mobile*"
                                    className="input"

                                />

                                <ErrorMessage name="phoneNumber" >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute ">{msg}</div>}
                                </ErrorMessage>  </div>
                            <div className="mb-2">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Mot de passe*"
                                    className="input"

                                />
                                <ErrorMessage name="password" >
                                    {(msg) => <div className="text-xs italic text-red-600 absolute ">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="mb-2">
                                <Field
                                    type="password"
                                    name="confirmpassword"
                                    placeholder="Confirmer mot de passe*"
                                    className="input"

                                />

                                <ErrorMessage name="confirmpassword" >
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
                                S'inscrire
                            </button>
                        </div>

                        <div className="mt-3 flex items-center justify-center text-sm">
                            <p>
                                Déja inscrit ?{" "}
                                <Link to="/login" className="text-emeraude underline ">Connectez vous</Link>
                            </p>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>

    );

};

export default Inscription;