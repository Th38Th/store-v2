import React, { createContext, useState, useContext, useEffect } from 'react';
import { ACCESS_TOKEN, KEEP_LOGGED_IN, REFRESH_TOKEN, USER_NAME } from '../constants';
import authDataManager from '../authDataManager';
import api from "../api"

// Create a context with default value of null
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(authDataManager.getToken(KEEP_LOGGED_IN));
  const [username, setUsername] = useState(authDataManager.getToken(USER_NAME));
  const [isLoggedIn, setIsLoggedIn] = useState(authDataManager.isLoggedIn());

    const login = async ({username, password, keepLoggedIn}) => {
        const res = await api.post("/api/token/", {username, password});
        authDataManager.setToken(USER_NAME, username);
        authDataManager.setToken(KEEP_LOGGED_IN, keepLoggedIn);
        authDataManager.setToken(ACCESS_TOKEN, res.data.access);
        authDataManager.setToken(REFRESH_TOKEN, res.data.refresh);
        setIsLoggedIn(true);
        setUsername(username);
    };

    const register = async({username, password}) => {
        await api.post("/api/user/register/", {username, password});
    };

    const refreshToken = async () => {
        const refreshToken = authDataManager.getToken(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                authDataManager.setToken(ACCESS_TOKEN, res.data.access);
                return true;
            } else {
                return false;
            }
        } catch(error) {
            return false;
        }
    };

    const auth = async() => {
        const token = authDataManager.getToken(ACCESS_TOKEN);
        console.log(localStorage);

        if (!token) {return false;}

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now){
            return await refreshToken();
        } else {
            return true;
        }
    }

    const logout = () => {
        authDataManager.clearToken(ACCESS_TOKEN);
        authDataManager.clearToken(REFRESH_TOKEN);
        setIsLoggedIn(false);
        setUsername(null);
    };

    return (
      <AuthContext.Provider value={{ isLoggedIn, keepLoggedIn, setKeepLoggedIn, register, login, logout, auth, username }}>
        {children}
      </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};