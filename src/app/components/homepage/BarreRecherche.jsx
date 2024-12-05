import React, { useState, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import { GeoApiFrProvider } from "leaflet-geosearch";

const BarreRecherche = () => {
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
  const [nombrePassagers, setNombrePassagers] = useState("");

  const containerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (depart.length < 3) {
        setDepartSuggestions([]);
        return;
      }

      try {
        const provider = new GeoApiFrProvider({
          searchUrl: "https://api-adresse.data.gouv.fr/search",
        });
        const results = await provider.search({ query: depart });
        setDepartSuggestions(results.slice(0, 5));
        // console.log(results);
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
        });
        const results = await provider.search({ query: destination });
        setDestinationSuggestions(results.slice(0, 5));
        //console.log(results);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    };

    fetchData();
  }, [destination]);

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

  const handleDepartSuggestionClick = (suggestion) => {
    setDepart(suggestion.label);
    setShowDepartSuggestions(false);
    const selected = {
      city: suggestion.raw.properties.city,
      zipcode: suggestion.raw.properties.postcode,
      street: suggestion.raw.properties.street,
      number: suggestion.raw.properties.housenumber,
      latitude: suggestion.y,
      longitude: suggestion.x,
    };

    setSelectedDepart(selected);
    // console.log(selected);
  };

  const handleDestinationSuggestionClick = (suggestion) => {
    setDestination(suggestion.label);
    setShowDestinationSuggestions(false);
    const selected = {
      city: suggestion.raw.properties.city,
      zipcode: suggestion.raw.properties.postcode,
      street: suggestion.raw.properties.street,
      number: suggestion.raw.properties.housenumber,
      latitude: suggestion.y,
      longitude: suggestion.x,
    };

    setSelectedDestination(selected);
  };

  const handleDepartChange = (e) => {
    setDepart(e.target.value);
    setShowDepartSuggestions(true);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setShowDestinationSuggestions(true);
  };

  const handleDateChange = (e) => {
    setDateDepart(e.target.value);
  };

  const handlePassagersChange = (e) => {
    setNombrePassagers(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          className="relative rounded-xl border-2 flex flex-auto w-2/3"
          ref={containerRef}
        >
          <DebounceInput
            minLength={3}
            debounceTimeout={1000}
            type="text"
            className="w-1/5 object-cover"
            placeholder="Départ"
            value={depart}
            onChange={handleDepartChange}
          />
          {showDepartSuggestions && departSuggestions.length > 0 && (
            <ul className="absolute bg-white w-1/4 border border-gray-300 shadow-md z-10 mt-10">
              {departSuggestions.map((suggestion) => (
                <li
                  key={suggestion.label}
                  className="text-sm p-1.5 cursor-pointer hover:bg-blue-800"
                  onClick={() => handleDepartSuggestionClick(suggestion)}
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
          
          <DebounceInput
            minLength={3}
            debounceTimeout={1000}
            type="text"
            className="w-1/5 object-cover"
            placeholder="Destination"
            value={destination}
            onChange={handleDestinationChange}
          />
          {showDestinationSuggestions && destinationSuggestions.length > 0 && (
            <ul className="absolute bg-white w-1/4 border border-gray-300 shadow-md z-10 mt-10 left-[20%]">
              {destinationSuggestions.map((suggestion) => (
                <li
                  key={suggestion.label}
                  className="text-sm p-1.5 cursor-pointer hover:bg-blue-800"
                  onClick={() => handleDestinationSuggestionClick(suggestion)}
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}

          <input
            type="date"
            className="w-1/5 object-cover"
            placeholder="Date départ"
            value={dateDepart}
            onChange={handleDateChange}
          ></input>
          <input
            type="number"
            min={0}
            className="w-1/5 object-cover"
            placeholder="Passagers"
            value={nombrePassagers}
            onChange={handlePassagersChange}
          ></input>
          <button className="btn-green object-fit w-1/5">Rechercher</button>
        </div>
      </div>
    </>
  );
};

export default BarreRecherche;
