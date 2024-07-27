import React, { createContext, useState, useContext } from 'react';
import { ACCESS_TOKEN, KEEP_LOGGED_IN, REFRESH_TOKEN } from '../constants';
import tokenManager from '../tokenManager';
import api from "../api"

// Create a context with default value of null
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const login = async ({username, password, keepLoggedIn}) => {
        const res = await api.post("/api/token/", {username, password});
        tokenManager.setToken(KEEP_LOGGED_IN, keepLoggedIn);
        tokenManager.setToken(ACCESS_TOKEN, res.data.access);
        tokenManager.setToken(REFRESH_TOKEN, res.data.refresh);
        setIsLoggedIn(true);
    };

    const register = async({username, password}) => {
        await api.post("/api/user/register/", {username, password});
    };

    const refreshToken = async () => {
        const refreshToken = tokenManager.getToken(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                tokenManager.setToken(ACCESS_TOKEN, res.data.access);
                return true;
            } else {
                return false;
            }
        } catch(error) {
            return false;
        }
    };

    const auth = async() => {
        const token = tokenManager.getToken(ACCESS_TOKEN);
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
        tokenManager.clearToken(ACCESS_TOKEN);
        tokenManager.clearToken(REFRESH_TOKEN);
        setIsLoggedIn(false);
    };

    return (
      <AuthContext.Provider value={{ isLoggedIn, keepLoggedIn, setKeepLoggedIn, register, login, logout, auth }}>
        {children}
      </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};