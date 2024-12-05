import { useDispatch } from "react-redux";
import { signOut } from "../../redux-store/authenticationSlice";

const SignOut = () => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut());
    };

    return (
        <>
            <button onClick={handleSignOut} className="btn btn-red rounded-full">
                Déconnexion
            </button>
        </>
    );
};

export default SignOut;
