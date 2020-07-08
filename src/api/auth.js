// Funciones para obtener el accessToken y refreshToken y gestionar todo esto

import { basePath, apiVersion } from './config';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode'; //Paquete instalado para decodificar el token


//Funcion para obtener el token y ponemos export para poder usarla en cualquier sitio
export function getAccessTokenApi() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if(!accessToken || accessToken ==='null') {
        return null;
    } 

    return willExpireToken(accessToken) ? null : accessToken; //Si ha expirado devuelve null, sino el accesToken

}

export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken || refreshToken ==='null') {
        return null;
    }

    return willExpireToken(refreshToken) ? null : refreshToken; //Si ha expirado devuelve null, sino el refreshToken
}

// Funcion en el cliente para conectar con el EndPoint y refrescar el accessToken
export function refreshAccessTokenApi(refreshToken) {
    const url = `${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj = { 
        refreshToken: refreshToken
    };
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(url, params)
    .then(response => {
        if (response.status !== 200) {
            return null;
        }
        return response.json();
    })
    .then(result => {
        if(!result) {
            logout();
        } else {
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    })
}

//Funcion para desloguear usuarios
export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

//funcion para comprobar si ha expirado el token
function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;

    return now > exp; //Si now es mayor que la fecha de expiracion del token --> true
} 