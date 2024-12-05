import { useStore } from "react-redux";
import { selectToken } from "../../redux-store/authenticationSlice";
import { useEffect, useState } from "react";
import { getUser } from "../../api/backend/account";

const UserCard = () => {
    const token = selectToken(useStore().getState());
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getUser(token)
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div className="w-full border-2 rounded-2xl my-3 p-4 bg-cobalt">
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="flex flex-col">
                    <p className="text-white">
                        {user.firstName.charAt(0).toUpperCase() +
                            user.firstName.slice(1) +
                            " " +
                            user.lastName.toUpperCase()}
                    </p>
                    <p className="text-white">{user.points} points</p>
                </div>
            )}
        </div>
    );
};

export default UserCard;
