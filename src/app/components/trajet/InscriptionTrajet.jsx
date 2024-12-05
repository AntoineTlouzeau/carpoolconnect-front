import { DebounceInput } from "react-debounce-input";
import React, { useState, useEffect, useRef } from "react";
import { GeoApiFrProvider } from "leaflet-geosearch";
import RadioButton from "./RadioButton";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { useStore } from "react-redux";
import carIcon from "../../assets/SVG/Car.svg";

const InscriptionTrajet = () => {
    const store = useStore();
    const token = store.getState().auth.token;

    const handleInscription = (e) => {
        e.preventDefault();
        axios.post(
            `http://localhost:8080/api/route/add`,
            {
                departure: selectedDepart,
                destination: selectedDestination,
                departureDate: dateDepart,
                musicGenre: selectedOption,
                silence: enabled,
                seats: nombrePassagers,
                smallBaggage: petitBagage,
                largeBaggage: grandBagage,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    };
    const containerRef = useRef();

    const handleDepartChange = (e) => {
        setDepart(e.target.value);
        setShowDepartSuggestions(true);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        setShowDestinationSuggestions(true);
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

    const [depart, setDepart] = useState("");
    const [departSuggestions, setDepartSuggestions] = useState([]);
    const [showDepartSuggestions, setShowDepartSuggestions] = useState(true);

    const [destination, setDestination] = useState("");
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [showDestinationSuggestions, setShowDestinationSuggestions] =
        useState(true);

    const [selectedDepart, setSelectedDepart] = useState({});
    const [selectedDestination, setSelectedDestination] = useState({});
    const [dateDepart, setDateDepart] = useState("");

    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [enabled, setEnabled] = useState(false);

    const [nombrePassagers, setNombrePassagers] = useState(1);
    const handleNombrePassager = (event) => {
        setNombrePassagers(event.target.value);
    };

    const [petitBagage, setPetitBagage] = useState("");
    const handlePetitBagage = (event) => {
        setPetitBagage(event.target.value);
    };

    const [grandBagage, setGrandBagage] = useState("");
    const handleGrandBagage = (event) => {
        setGrandBagage(event.target.value);
    };

    useEffect(() => {
        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16);
        setDateDepart(formattedDateTime);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (depart.length < 3) {
                setDepartSuggestions([]);
                return;
            }

            try {
                const provider = new GeoApiFrProvider({
                    searchUrl: "https://api-adresse.data.gouv.fr/search",
                    reverseUrl: "https://api-adresse.data.gouv.fr/reverse",
                });
                const results = await provider.search({ query: depart });
                setDepartSuggestions(results.slice(0, 5));
            } catch (error) {
                console.error("Erreur lors de la recherche :", error);
            }
        };

        fetchData();
    }, [depart]);

    useEffect(() => {
        const fetchData = async () => {
            if (destination.length < 3) {
                setDestinationSuggestions([]);
                return;
            }

            try {
                const provider = new GeoApiFrProvider({
                    searchUrl: "https://api-adresse.data.gouv.fr/search",
                    reverseUrl: "https://api-adresse.data.gouv.fr/reverse",
                });
                const results = await provider.search({ query: destination });
                setDestinationSuggestions(results.slice(0, 5));
            } catch (error) {
                console.error("Erreur lors de la recherche :", error);
            }
        };

        fetchData();
    }, [destination]);

    const handleDepartSuggestionClick = (suggestion) => {
        setDepart(suggestion.label);
        setShowDepartSuggestions(false);

        const selected = {
            //adress: suggestion.label, //pour test, pas dans le mcd
            city: suggestion.raw.properties.city,
            zipcode: suggestion.raw.properties.postcode,
            street: suggestion.raw.properties.street,
            number: suggestion.raw.properties.housenumber,
            latitude: suggestion.y,
            longitude: suggestion.x,
        };

        setSelectedDepart(selected);
        //console.log(selected);
    };

    const handleDestinationSuggestionClick = (suggestion) => {
        setDestination(suggestion.label);
        setShowDestinationSuggestions(false);
        const selected = {
            //adress: suggestion.label, //pour test, pas dans le mcd
            city: suggestion.raw.properties.city,
            zipcode: suggestion.raw.properties.postcode,
            street: suggestion.raw.properties.street,
            number: suggestion.raw.properties.housenumber,
            latitude: suggestion.y,
            longitude: suggestion.x,
        };

        setSelectedDestination(selected);
    };

    return (
        <div className="pt-4">
            <div className="flex items-center justify-center">
                <img 
                    className="h-12 mb-4 mr-3"
                    src={carIcon}
                />
                <h3 className="text-cobalt font-bold mb-4 text-center">
                    Proposer un trajet
                </h3>
            </div>
            <hr />

            <form
                ref={containerRef}
                className="p-4"
                onSubmit={(e) => handleInscription(e)}
            >
                <div>
                    <div className="flex mb-4">
                        <div className="flex-1 mr-4">
                            <p>Lieu de départ :</p>
                            <DebounceInput
                                minLength={3}
                                debounceTimeout={500}
                                type="text"
                                className="input w-full"
                                value={depart}
                                onChange={handleDepartChange}
                                name="departure"
                            />
                            {showDepartSuggestions &&
                                departSuggestions.length > 0 && (
                                    <ul className="suggestions-list">
                                        {departSuggestions.map((suggestion) => (
                                            <li
                                                key={suggestion.label}
                                                className="suggestion-item"
                                                onClick={() =>
                                                    handleDepartSuggestionClick(
                                                        suggestion
                                                    )
                                                }
                                            >
                                                {suggestion.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>

                        <div className="flex-1">
                            <p>Lieu d'arrivée :</p>
                            <DebounceInput
                                minLength={3}
                                debounceTimeout={500}
                                type="text"
                                className="input w-full"
                                value={destination}
                                onChange={handleDestinationChange}
                                name="destination"
                            />
                            {showDestinationSuggestions &&
                                destinationSuggestions.length > 0 && (
                                    <ul className="suggestions-list">
                                        {destinationSuggestions.map(
                                            (suggestion) => (
                                                <li
                                                    key={suggestion.label}
                                                    className="suggestion-item"
                                                    onClick={() =>
                                                        handleDestinationSuggestionClick(
                                                            suggestion
                                                        )
                                                    }
                                                >
                                                    {suggestion.label}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <input
                            type="datetime-local"
                            name="departureDate"
                            className="input"
                            value={dateDepart}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="flex mb-4">
                        <p>Nombre de passagers :</p>
                        <input
                            type="number"
                            value={nombrePassagers}
                            onChange={handleNombrePassager}
                            min={1}
                            max={4}
                            className="input w-full"
                            name="seats"
                        />
                    </div>
                    <div className="flex mb-6">
                        <div className="w-full mr-4">
                            <label htmlFor="">Nombre de petits bagages:</label>
                            <input
                                type="number"
                                value={petitBagage}
                                onChange={handlePetitBagage}
                                min={0}
                                max={3}
                                name="smallBaggage"
                                className="input"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">Nombre de grands bagages:</label>
                            <input
                                type="number"
                                value={grandBagage}
                                onChange={handleGrandBagage}
                                min={0}
                                max={3}
                                name="largeBaggage"
                                className="input"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Quel type de musique ? :</label>
                        <div className="mt-4 mb-6">
                            <RadioButton
                                label="Pop"
                                value="Pop"
                                checked={selectedOption === "Pop"}
                                onChange={handleOptionChange}
                                name="musicGenre"
                            />
                            <RadioButton
                                label="Rock"
                                value="Rock"
                                checked={selectedOption === "Rock"}
                                onChange={handleOptionChange}
                                name="musicGenre"
                            />
                            <RadioButton
                                label="Rap"
                                value="Rap"
                                checked={selectedOption === "Rap"}
                                onChange={handleOptionChange}
                                name="musicGenre"
                            />
                            <RadioButton
                                label="Electro"
                                value="Electro"
                                checked={selectedOption === "Electro"}
                                onChange={handleOptionChange}
                                name="musicGenre"
                            />
                            <RadioButton
                                label="Variété"
                                value="Variété"
                                checked={selectedOption === "Variété"}
                                onChange={handleOptionChange}
                                name="musicGenre"
                            />
                            <RadioButton
                                label="Indifférent"
                                value="Indifférent"
                                checked={selectedOption === "Indifférent"}
                                onChange={handleOptionChange}
                                name="musicGenre"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <p>Voyage silencieux :</p>
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            name="silence"
                            className={`${
                                enabled ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${
                                    enabled ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full bg-emeraude hover:font-semibold hover:underline text-white py-2 px-4 rounded-full"
                        >
                            Proposer un trajet
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InscriptionTrajet;
