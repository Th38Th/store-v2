import React from "react"
import { useAuth } from "./AuthProvider";
import "../styles/NavigationBar.css"

function NavigationBar() {
    const {isLoggedIn, logout} = useAuth();

    return (<nav className="nav-bar">
        {isLoggedIn && <button className="nav-button"
        onClick={logout}>LOGOUT</button>}
    </nav>)
}

export default NavigationBar