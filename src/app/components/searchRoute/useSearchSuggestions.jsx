import { useState, useEffect } from "react";
import { GeoApiFrProvider } from "leaflet-geosearch";

const useSearchSuggestions = (searchQuery) => {
  const [suggestions, setSuggestions] = useState([]);
  //const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchData = async () => {
      try {
        const provider = new GeoApiFrProvider({
          searchUrl: "https://api-adresse.data.gouv.fr/search",
        });
        const results = await provider.search({ query: searchQuery });
        setSuggestions(results.slice(0, 5));
        //setShowSuggestions(true);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return [suggestions];
};

export default useSearchSuggestions;
