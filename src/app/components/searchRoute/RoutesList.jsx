import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import USER from "../../assets/Icônes/Icon_User.png";
import useRouteDuration from "./useRouteDuration";
import { format, addSeconds } from "date-fns";

const RoutesList = ({ routes }) => {
  const durations = useRouteDuration(routes);
  const [arrivalTimes, setArrivalTimes] = useState({});

  useEffect(() => {
    const newArrivalTimes = {};
    routes.forEach((route) => {
      const duration = durations[route.id];
      if (duration) {
        newArrivalTimes[route.id] = calculateArrivalTime(
          route.departureDate,
          duration
        );
      }
    });
    setArrivalTimes(newArrivalTimes);
  }, [routes, durations]);

  const calculateArrivalTime = (departureDateArray, durationInSeconds) => {
    const [year, month, day, hour, minute] = departureDateArray;
    const departureDateTime = new Date(year, month - 1, day, hour, minute);
    const arrivalDateTime = addSeconds(departureDateTime, durationInSeconds);
    return format(arrivalDateTime, "HH:mm");
  };

  if (routes.length === 0) {
    return (
      <div className="text-center my-4">
        Aucun trajet ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <div className="w-full ">
      {routes.map((route) => (
        <div
          key={route.id}
          className="w-full border-2 border-stone-500 rounded-2xl  p-4 bg-white m-5 "
        >
          <div className="flex items-center">
            <div className="justify-center">
              <img
                src={USER}
                alt=""
                className="border-2 border-stone-500 rounded-full w-32 h-32   object-cover "
              />
            </div>
            <div className="ml-5 " >
              <h6 className="text-cobalt ">
                {route.driver.firstName} {route.driver.lastName}
              </h6>
              {route.silence ? (
                <p className="text-sm">✔️ Voyage silencieux </p>
              ) : ("")}
              {route.musicGenre ? (
                <p className="text-sm">✔️ Musique {route.musicGenre}</p>
              ) : ("")}
              {route.largeBaggage > 0 ? (
                <p className="text-sm">✔️ Bagages volumineux acceptés</p>
              ) : ("")}
              <div className="flex flex-auto mt-2">
                <div className="pl-2">
                  <p className="font-semibold">{route.departure.city}</p>
                  <p className="ml-1">
                    • départ à {String(route.departureDate[3]).padStart(2, "0")}
                    :{String(route.departureDate[4]).padStart(2, "0")}
                  </p>
                </div>

                <div className="pl-24">
                  <p className="font-semibold">{route.destination.city}</p>
                  <p className="ml-1">
                    • arrivée à {arrivalTimes[route.id]}{" "}
                  </p>
                </div>
              </div>

              {/* <p className="text-sm mt-2">Places disponibles : {route.seats}</p> */}
              <div className="mt-2 text-center">
                <Link
                  to={`/route/${route.id}`}
                  className="text-green-500 underline "
                >
                  Voir le trajet
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoutesList;
