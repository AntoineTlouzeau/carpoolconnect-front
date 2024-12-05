import React from "react";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Switch } from "@headlessui/react";
import { searchRoute } from "../../api/backend/route";
import RoutesList from "./RoutesList";
import SearchInput from "./SearchInput";
import SliderInput from "./SliderInput";
import useSearchSuggestions from "./useSearchSuggestions";
import { format } from "date-fns";

const SearchRoute = () => {
    const [depart, setDepart] = useState("");
    const [destination, setDestination] = useState("");

    const [selectedDepart, setSelectedDepart] = useState({});
    const [selectedDestination, setSelectedDestination] = useState({});

    const [departSuggestions] = useSearchSuggestions(depart);
    const [destinationSuggestions] = useSearchSuggestions(destination);
    const [showDepartSuggestions, setShowDepartSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] =
        useState(false);

    const [departSlider, setDepartSlider] = useState(1);
    const [destinationSlider, setDestinationSlider] = useState(1);

    const [dateDepart, setDateDepart] = useState("");
    const [seats, setSeats] = useState(1);
    const [enabled, setEnabled] = useState(false);
    const [baggage, setBaggage] = useState(0);

    const containerRef = useRef();

    const [routesResult, setRoutesResult] = useState([]);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        setBaggage(enabled ? 1 : 0);
    }, [enabled]);

    useEffect(() => {
        const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
        setDateDepart(now);
    }, []);

    const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    const minDateTime = now;

    const handleSuggestionClick = (suggestion, isDepart) => {
        const selected = {
            city: suggestion.raw.properties.city,
            zipcode: suggestion.raw.properties.postcode,
            street: suggestion.raw.properties.street,
            number: suggestion.raw.properties.housenumber,
            latitude: suggestion.y,
            longitude: suggestion.x,
        };

        if (isDepart) {
            setSelectedDepart(selected);
            setShowDepartSuggestions(false);
            setDepart(suggestion.label);
        } else {
            setSelectedDestination(selected);
            setShowDestinationSuggestions(false);
            setDestination(suggestion.label);
        }
    };

    const handleLocationChange = (e, isDepart) => {
        isDepart ? setDepart(e.target.value) : setDestination(e.target.value);
        isDepart
            ? setShowDepartSuggestions(true)
            : setShowDestinationSuggestions(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setShowDepartSuggestions(false);
                setShowDestinationSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    const handleDateChange = (e) => {
        setDateDepart(e.target.value);
    };

    const handleSeats = (e) => {
        setSeats(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dateDepart);
        try {
            const response = await searchRoute(
                selectedDepart.city,
                selectedDestination.city,
                dateDepart,
                selectedDepart.latitude,
                selectedDepart.longitude,
                selectedDestination.latitude,
                selectedDestination.longitude,
                departSlider,
                destinationSlider,
                seats,
                baggage
            );
            setRoutesResult(response.data);
            console.log(response.data);
            setShowForm(false);
        } catch (error) {
            console.error("Erreur lors de la requête : ", error);
        }
    };

    const resetSearch = () => {
        setShowForm(true);
        setRoutesResult([]);
    };

    return (
        <div className="p-2">
            <div>
                <h3 className="text-cobalt font-bold mb-4 text-center pt-4">
                    <SearchIcon
                        className="text-green-500"
                        style={{ fontSize: "3rem" }}
                    />
                    Rechercher un trajet
                </h3>
            </div>
            <hr />
            {showForm ? (
                <form
                    className="mt-8 space-y-6"
                    ref={containerRef}
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
                            <div className="flex-1">
                                <p>Lieu de départ :</p>
                                <SearchInput
                                    value={depart}
                                    onChange={(e) =>
                                        handleLocationChange(e, true)
                                    }
                                    suggestions={departSuggestions}
                                    handleSuggestionClick={(suggestion) =>
                                        handleSuggestionClick(suggestion, true)
                                    }
                                    showSuggestions={showDepartSuggestions}
                                    customStyle={`input w-full`}
                                    customPlaceholder={``}
                                />
                            </div>
                            <SliderInput
                                label="Dans un rayon de"
                                value={departSlider}
                                min="1"
                                max="50"
                                onChange={(e) =>
                                    setDepartSlider(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
                            <div className="flex-1">
                                <p>Lieu d'arrivée :</p>
                                <SearchInput
                                    value={destination}
                                    onChange={(e) =>
                                        handleLocationChange(e, false)
                                    }
                                    suggestions={destinationSuggestions}
                                    handleSuggestionClick={(suggestion) =>
                                        handleSuggestionClick(suggestion, false)
                                    }
                                    showSuggestions={showDestinationSuggestions}
                                    customStyle={`input w-full`}
                                    customPlaceholder={``}
                                />
                            </div>
                            <SliderInput
                                label="Dans un rayon de"
                                value={destinationSlider}
                                min="1"
                                max="50"
                                onChange={(e) =>
                                    setDestinationSlider(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <p>Date et heure de départ :</p>
                            <input
                                type="datetime-local"
                                className="input "
                                min={minDateTime}
                                value={dateDepart}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="flex mb-4">
                            <p>Nombre de passagers :</p>
                            <input
                                type="number"
                                value={seats}
                                onChange={handleSeats}
                                min={1}
                                max={4}
                                className="input w-1/6 ml-8"
                                name="seats"
                            />
                        </div>
                        <div>
                            <p>Accepte les bagages volumineux :</p>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                    enabled ? "bg-blue-600" : "bg-gray-200"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span
                                    className={`${
                                        enabled
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                            </Switch>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full`}
                            >
                                Rechercher un trajet
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div>
                    <RoutesList routes={routesResult} />
                    <p
                        className="text-green-500 text-center cursor-pointer underline"
                        onClick={resetSearch}
                    >
                        Rechercher un trajet
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchRoute;
