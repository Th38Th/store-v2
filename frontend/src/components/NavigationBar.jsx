import React from "react"
import { tokenManager } from "../api"
import "../styles/NavigationBar.css"

function NavigationBar() {
    return (<nav className="nav-bar">
        {tokenManager.isLoggedIn() && <button className="nav-button"
        onClick={()=>{
            tokenManager.clearAll();
            window.location.reload();
            }}>LOGOUT</button>}
    </nav>)
}

export default NavigationBar