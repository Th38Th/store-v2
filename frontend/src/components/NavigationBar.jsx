import React from "react"
import { useAuth } from "./AuthProvider";
import "../styles/NavigationBar.css"
import UserPanel from "./UserPanel";

function NavigationBar() {
    const {isLoggedIn, logout} = useAuth();

    return (<nav className="nav-bar">
        <div className="nav-main-area">

        </div>
        <div className="flex-reversed">
            <UserPanel/>
        </div>
    </nav>)
}

export default NavigationBar