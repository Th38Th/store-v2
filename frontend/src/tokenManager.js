import { ACCESS_TOKEN, REFRESH_TOKEN, KEEP_LOGGED_IN } from "./constants";

function isValidTokenType(key) {
    return [ACCESS_TOKEN, REFRESH_TOKEN, KEEP_LOGGED_IN].includes(key);
}

const tokenManager = {
    setToken: (key, value) => {
        if (!isValidTokenType(key)) return;
        if (localStorage.getItem(KEEP_LOGGED_IN)){
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    },
    getToken: (key) => {
        if (!isValidTokenType(key)) return null;
        if (localStorage.getItem(KEEP_LOGGED_IN)){
            return localStorage.getItem(key);
        } else {
            return sessionStorage.getItem(key);
        }
    },
    clearToken: (key) => {
        if (!isValidTokenType(key)) return null;
        if (localStorage.getItem(KEEP_LOGGED_IN)){
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }
    }
};

export default tokenManager;