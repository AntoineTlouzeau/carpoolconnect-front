import {
    URL_BACK_AUTHENTICATE,
    URL_BACK_PASSWORD_RENEWAL,
    URL_BACK_FORGOTTEN_PASSWORD,
    URL_BACK_REGISTER,
    URL_BACK_ACTIVATION,
    URL_BACK_DELETE,
    URL_BACK_MODIFY,
    URL_BACK_GET_USER
} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function renewPassword(values) {
    return apiBackEnd.post(URL_BACK_PASSWORD_RENEWAL, values);
}

export function passwordForgotten(values) {
    return apiBackEnd.post(URL_BACK_FORGOTTEN_PASSWORD, values);
}
export function register(values) {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function activate(values) {
    return apiBackEnd.post(URL_BACK_ACTIVATION, values);
}

// Supprimer un compte 
export function deleteAccount(token) {
    return apiBackEnd.delete(URL_BACK_DELETE, token);
}

// Modifier le mot de passe
export function modifyPassword(values, token){
    return apiBackEnd.post(URL_BACK_MODIFY, values, { headers: { "Authorization": `Bearer ${token}` } });
}

export function getUser(token) {
    return apiBackEnd.get(URL_BACK_GET_USER, {headers: {Authorization: `Bearer ${token}`}});
}
