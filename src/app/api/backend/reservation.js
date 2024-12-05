import {
    URL_BACK_ACCEPT_RESERVATION,
    URL_BACK_ASK_RESERVATION,
    URL_BACK_AWAITING_RESERVATION,
    URL_BACK_CANCEL_RESERVATION,
    URL_BACK_DENY_RESERVATION,
    URL_BACK_GET_USER_RESERVATIONS,
} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function getAwaitingReservation(token) {
    return apiBackEnd.get(URL_BACK_AWAITING_RESERVATION, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function acceptReservation(values, token) {
    return apiBackEnd.post(URL_BACK_ACCEPT_RESERVATION, values, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function denyReservation(values, token) {
    return apiBackEnd.post(URL_BACK_DENY_RESERVATION, values, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function cancelReservation(values, token) {
    return apiBackEnd.post(URL_BACK_CANCEL_RESERVATION, values, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function askReservation(route, numberOfPassengers, token) {
    return apiBackEnd.post(URL_BACK_ASK_RESERVATION, route, {
        headers: { Authorization: `Bearer ${token}` },
        params: { numberOfPassengers: numberOfPassengers },
    });
}

export function getUserReservations(page, token) {
    return apiBackEnd.get(URL_BACK_GET_USER_RESERVATIONS + `/${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

