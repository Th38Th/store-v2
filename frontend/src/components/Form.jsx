import { useState } from "react"
import { api, tokenManager }  from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"
import Checkbox from "./Checkbox"

function Form({route, method}) {
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
            const res = await api.post(route, {username, password});
            if (method === "login") {
                console.log(keepLoggedIn);
                tokenManager.setKeepLoggedIn(keepLoggedIn);
                tokenManager.setToken(ACCESS_TOKEN, res.data.access);
                tokenManager.setToken(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch(error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
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
        <Checkbox
            label="Keep Me Logged In"
            value={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
        />
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form