import React from "react"
import "../styles/NavigationBar.css"
import UserPanel from "./UserPanel";

function NavigationBar() {
    return (<nav className="nav-bar">
        <div className="nav-main-area">

        </div>
        <div className="flex-reversed">
            <UserPanel/>
        </div>
    </nav>)
}

export default NavigationBar