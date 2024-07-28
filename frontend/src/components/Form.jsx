import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"
import Checkbox from "./Checkbox"
import { useAuth } from "./AuthProvider"

function Form({method, showTitle}) {
    const { login, register } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login"? "Login" : "Register";
    
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            if (method === "login") {
                console.log({username, password, keepLoggedIn});
                login({username, password, keepLoggedIn})
                .then(()=>navigate("/"));
            } else {
                register({username, password})
                .then(()=>navigate("/login"));
            }
        } catch(error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        {showTitle && <h1>{name}</h1>}
        <input 
            className="form-input" 
            type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" 
        />
        <input 
            className="form-input" 
            type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
        />
        {method == "login" &&
        <Checkbox
            label="Keep Me Logged In"
            value={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
        />}
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form