import { Field, Formik, Form, useFormik } from "formik";
import { askReservation } from "../../api/backend/reservation";
import { useStore } from "react-redux";
import { selectToken } from "../../redux-store/authenticationSlice";

const AskReservationForm = ({ route, setReservationSent }) => {

    const state = useStore().getState();
    const token = selectToken(state);

    const formik = useFormik({
        enableReinitialize: true,
    });

    const handleReservation = (values) => {
        askReservation(route, values.numberOfPassengers, token)
            .then((res) => {
                if (res.status === 200) {
                    setReservationSent(true);
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <Formik
            onSubmit={handleReservation}
            initialValues={{
                numberOfPassengers: 1,
            }}
        >
            <Form>
                <label>Nombre de passagers : </label>
                <Field
                    className="mb-4 input"
                    type="number"
                    name="numberOfPassengers"
                    default={1}
                    min={1}
                    max={route.seats}
                ></Field>
                <button
                    type="submit"
                    className={`w-full bg-emeraude hover:font-semibold hover:underline text-white  py-2 px-4 rounded-full`}
                >
                    Demander une réservation
                </button>
            </Form>
        </Formik>
    );
};

export default AskReservationForm;
