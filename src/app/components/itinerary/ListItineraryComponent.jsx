import { useState } from "react";
import carIcon from "../../assets/SVG/Car.svg";
import ListItinerary from "./ListItinerary";

const ListItineraryComponent = () => {
    const page = {
        Past: "past",
        Future: "future",
    };

    const [currentPage, setCurrentPage] = useState(page.Future);

    return (
        <div className="pt-4">
            <div className="h-full w-full flex flex-col divide-y-2 divide-stone-800">
                <div className="flex items-center justify-center">
                    <img className="h-12 mb-4 mr-3" src={carIcon} />
                    <h3 className="text-cobalt font-bold mb-4 text-center">
                        Mes trajets
                    </h3>
                </div>
                <div className="divide-x-2 divide-stone-800">
                    <button
                        className={`w-1/2 h-10 text-cobalt font-bold ${
                            currentPage === page.Future ? "bg-azur" : ""
                        }`}
                        onClick={() => setCurrentPage(page.Future)}
                    >
                        A venir
                    </button>
                    <button
                        className={`w-1/2 h-10 text-cobalt font-bold ${
                            currentPage === page.Past ? "bg-azur" : ""
                        }`}
                        onClick={() => setCurrentPage(page.Past)}
                    >
                        Passés
                    </button>
                </div>
                <div
                    style={{
                        height: "28rem",
                    }}
                    className="overflow-auto"
                >
                    <div className="mt-2 h-full">
                        <ul className="h-full">
                            <ListItinerary currentPage={currentPage} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListItineraryComponent;
