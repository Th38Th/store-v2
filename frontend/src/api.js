import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN, KEEP_LOGGED_IN } from "./constants"

const tokenManager = {
    isValidTokenType: (key) => {
        return [ACCESS_TOKEN, REFRESH_TOKEN, KEEP_LOGGED_IN].includes(key);
    },
    setToken: (key, value) => {
        if (!tokenManager.isValidTokenType(key)) return;
        if (localStorage.getItem(KEEP_LOGGED_IN)){
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    },
    getToken: (key) => {
        if (!tokenManager.isValidTokenType(key)) return null;
        if (localStorage.getItem(KEEP_LOGGED_IN)){
            return localStorage.getItem(key);
        } else {
            return sessionStorage.getItem(key);
        }
    },
    isLoggedIn: () => {
        if (localStorage.getItem(KEEP_LOGGED_IN)){
            return localStorage.getItem(ACCESS_TOKEN) 
            && localStorage.getItem(REFRESH_TOKEN);
        } else {
            return sessionStorage.getItem(ACCESS_TOKEN) 
            && sessionStorage.getItem(REFRESH_TOKEN);
        }
    },
    clearAll: (key) => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        sessionStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem(REFRESH_TOKEN);
    },
    setKeepLoggedIn: (value) => {
        localStorage.setItem(KEEP_LOGGED_IN, value);
    }
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = tokenManager.getToken(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export { api, tokenManager }