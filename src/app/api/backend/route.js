import {
    URL_BACK_AVAILABLE_SEATS,
    URL_BACK_GET_ROUTE,
    URL_BACK_GET_ROUTE_PAGE,
    URL_BACK_SEARCH,
} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function getAvailableSeats(values) {
    return apiBackEnd.post(URL_BACK_AVAILABLE_SEATS, values);
}

export function getRoute(id) {
    return apiBackEnd.get(URL_BACK_GET_ROUTE + `/${id}`);
}

export function getRoutePage(page, token) {
    return apiBackEnd.get(URL_BACK_GET_ROUTE_PAGE + `/${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function searchRoute(departureCity, destinationCity, departureDate, departLat, departLong, destinationLat, destinationLong, departRadius, destinationRadius, seats, baggage) {
    return apiBackEnd.get(URL_BACK_SEARCH,  {
        params: {
            departureCity,
            destinationCity,
            departureDate,
            departLat, 
            departLong, 
            destinationLat, 
            destinationLong, 
            departRadius, 
            destinationRadius,
            seats,
            baggage
        },
    });
}
