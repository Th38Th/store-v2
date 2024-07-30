import React, { createContext, useState, useContext, useEffect } from 'react';
import api from "../api"

// Create a context with default value of null
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [username, setUsername] = useState(/*authDataManager.getToken(USER_NAME)*/);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(()=>{
    api.verify()
    .then((res)=>setIsLoggedIn(res))
    .catch(()=>setIsLoggedIn(false));
  },[]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, keepLoggedIn, username }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};