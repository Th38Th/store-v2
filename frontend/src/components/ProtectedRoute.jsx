import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { useState, useEffect } from "react"
import { useAuth } from "./AuthProvider"
import Unauthorized from "../pages/Unauthorized"

function ProtectedRoute({children}){
    const { isLoggedIn } = useAuth();
    
    if (isLoggedIn === null){
        return <div>Loading...</div>
    }

    return isLoggedIn? children :
        <Unauthorized login={true}/>
}

export default ProtectedRoute