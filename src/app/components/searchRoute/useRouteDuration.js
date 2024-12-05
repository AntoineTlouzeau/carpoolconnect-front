import { useState, useEffect } from "react";

const useRouteDuration = (routes) => {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    const fetchDurations = async () => {
      const newDurations = {};
      for (const route of routes) {
        const departLat = route.departure.latitude;
        const departLong = route.departure.longitude;
        const destLat = route.destination.latitude;
        const destLong = route.destination.longitude;

        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${departLong},${departLat};${destLong},${destLat}?overview=false`
          );
          const data = await response.json();
          newDurations[route.id] = data.routes[0].duration;
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de la durée du trajet :",
            error
          );
          newDurations[route.id] = "/";
        }
      }
      setDurations(newDurations);
    };

    if (routes.length > 0) {
      fetchDurations();
    }
  }, [routes]);

  return durations;
};

export default useRouteDuration;
