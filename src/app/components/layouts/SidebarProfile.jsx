import UserCard from "./UserCard";
import carIcon from "../../assets/SVG/Car.svg";
import lockIcon from "../../assets/SVG/Padlock.svg";
import coinsIcon from "../../assets/Icônes/Coins.png";
import purseIcon from "../../assets/SVG/Purse.svg";
import binIcon from "../../assets/SVG/Bin.svg";

const SidebarProfile = ({ page, change }) => {

    const handleClick = (page) => {
        change(page);
    };

    return (
        <div className="flex flex-col">
            <UserCard />
            <button
                onClick={() => handleClick("route")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "route" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={carIcon} />
                    <p>Mes trajets</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("password")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "password" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={lockIcon} />
                    <p>Changer mon mot de passe</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("buyPoints")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "buyPoints" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={coinsIcon} />
                    <p>Acheter des points</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("sellPoints")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "sellPoints" ? "bg-jade" : "bg-white"}
        `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={purseIcon} />
                    <p>Vendre mes points</p>
                </div>
            </button>
            <button
                onClick={() => handleClick("deleteAccount")}
                className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                ${page === "deleteAccount" ? "bg-jade" : "bg-white"}
                `}
            >
                <div className="flex">
                    <img className="h-6 my-auto mr-2" src={binIcon} />
                    <p>Supprimer mon compte</p>
                </div>
            </button>
            {/* <button
                    onClick={() => handleClick("deactivateAccount")}
                    className={`w-full border-2 border-stone-500 rounded-2xl my-3 p-4
                    ${page === "deactivateAccount" ? "bg-jade" : "bg-white"}
            `}
                >
                    Désactiver mon compte
                </button> */}
        </div>
    );
};

export default SidebarProfile;
