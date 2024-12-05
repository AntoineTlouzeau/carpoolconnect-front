import { URL_BACK_ASK_RESERVATION, URL_BACK_PAST_ROUTES } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function listPastRoutes(token) {
    apiBackEnd.get(URL_BACK_PAST_ROUTES, token);
}

export function askReservation(value, token) {
    apiBackEnd.post(URL_BACK_ASK_RESERVATION, value, {headers: {Authorization: `Bearer ${token}`}});
}