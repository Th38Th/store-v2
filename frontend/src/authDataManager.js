import { ACCESS_TOKEN, REFRESH_TOKEN, KEEP_LOGGED_IN, USER_NAME } from "./constants";

function isValidTokenType(key) {
    return [ACCESS_TOKEN, REFRESH_TOKEN, KEEP_LOGGED_IN, USER_NAME].includes(key);
}

const authDataManager = {
    isLoggedIn: () => {
        return authDataManager.getToken(ACCESS_TOKEN)
        && authDataManager.getToken(REFRESH_TOKEN);
    },
    setToken: (key, value) => {
        if (!isValidTokenType(key)) return;
        if (localStorage.getItem(KEEP_LOGGED_IN) 
        || key == KEEP_LOGGED_IN){
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    },
    getToken: (key) => {
        if (!isValidTokenType(key)) return null;
        if (localStorage.getItem(KEEP_LOGGED_IN)
        || key == KEEP_LOGGED_IN){
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

export default authDataManager;