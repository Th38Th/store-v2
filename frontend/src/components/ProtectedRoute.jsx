import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"
import { useAuth } from "./AuthProvider"
import Unauthorized from "../pages/Unauthorized"

function ProtectedRoute({children}){
    const { auth } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().then((res) => setIsAuthorized(res))
        .catch(() => setIsAuthorized(false));
    }, []);
    
    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized? children : <Unauthorized login={true}/>
}

export default ProtectedRoute