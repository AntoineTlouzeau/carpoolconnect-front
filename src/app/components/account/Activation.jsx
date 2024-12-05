import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../../api/backend/account";

const Activation = () => {
    const params = useParams();
    const navigate = useNavigate();

    const handleActivation = () => {
        console.log(params);
        activate(params)
            .then(() => navigate("/"))
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-center mb-4 font-bold text-cobalt">Activation de votre email</h2>
            <div className="flex items-center justify-center">
                <button
                    onClick={handleActivation}
                    className="btn btn-green my-4 w-1/2"
                >
                    Activer mon compte
                </button>
            </div>
        </div>
    );
};

export default Activation;
