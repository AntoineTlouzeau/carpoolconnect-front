import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import SearchInput from '../searchRoute/SearchInput';
import useSearchSuggestions from '../searchRoute/useSearchSuggestions';
import { searchRoute } from "../../api/backend/route";
import { format } from 'date-fns';

const SearchBar = () => {

    const [depart, setDepart] = useState("");
    const [destination, setDestination] = useState("");
  
    const [selectedDepart, setSelectedDepart] = useState({});
    const [selectedDestination, setSelectedDestination] = useState({});
  
    const [departSuggestions] = useSearchSuggestions(depart);
    const [destinationSuggestions] = useSearchSuggestions(destination);
    const [showDepartSuggestions, setShowDepartSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

    const [departSlider, setDepartSlider] = useState(5);
    const [destinationSlider, setDestinationSlider] = useState(5);
    const [baggage, setBaggage] = useState(0);

    const [dateDepart, setDateDepart] = useState("");
    const [formatedDate, setFormatedDate] = useState("");
    const [seats, setSeats] = useState("");

    const containerRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

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
        isDepart ? setShowDepartSuggestions(true) : setShowDestinationSuggestions(true);
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

      const now = format(new Date(), 'yyyy-MM-dd');
      const minDateTime = now;

      const handleDateChange = (e) => {
        setFormatedDate(e.target.value);
        setDateDepart(e.target.value + "T12:00");
      };
    
      const handleSeats = (e) => {
        setSeats(e.target.value);
      };  

      const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
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
          navigate('/results', { state: { routes: response.data, isLoading} });
        } catch (error) {
          console.error("Erreur lors de la requête : ", error);
        }  finally {
          setIsLoading(false); 
        }
      };  

      if (isLoading) {
        return <div>Chargement...</div>;
      }

    return (
        <>
        <div className="flex justify-center">
          <div
            className="relative rounded-xl border-2 flex flex-auto w-2/3"
            ref={containerRef}
          >
          <div className="w-1/5 object-cover">
            <SearchInput
                value={depart}
                onChange={(e) => handleLocationChange(e, true)}
                suggestions={departSuggestions}
                handleSuggestionClick={(suggestion) => handleSuggestionClick(suggestion, true)}
                showSuggestions={showDepartSuggestions}
                customStyle={"w-full"}
                customPlaceholder={"Départ"}
              />
            </div>
            <div className="w-1/5 object-cover">
            <SearchInput
                value={destination}
                onChange={(e) => handleLocationChange(e, false)}
                suggestions={destinationSuggestions}
                handleSuggestionClick={(suggestion) => handleSuggestionClick(suggestion, false)}
                showSuggestions={showDestinationSuggestions}
                customStyle={"w-full"}
                customPlaceholder={"Destination"}
              />              
              </div>
            <input
              type="date"
              className="w-1/5 object-cover"
              placeholder="Date départ"
              value={formatedDate}
              min={minDateTime}
              onChange={handleDateChange}
            ></input>
            <input
              type="number"
              min={1}
              className="w-1/5 object-cover"
              placeholder="Passagers"
              value={seats}
              onChange={handleSeats}
            ></input>
            <button className="btn-green object-fit w-1/5" onClick={handleSubmit}>Rechercher</button>
          </div>
        </div>
      </>
    );
};

export default SearchBar;