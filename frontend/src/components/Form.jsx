import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"
import Checkbox from "./Checkbox"
import api from "../api"
import { useDispatch, useSelector } from "react-redux"
import { setKeepLoggedIn, setUserName, setIsLoggedIn } from "../stores/AuthSlice"

function Form({method, showTitle}) {
    const dispatch = useDispatch();
    const keepLoggedIn = useSelector((state) => state.auth.keepLoggedIn);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login"? "Login" : "Register";

    const handleLogin = () => {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserName(username));
    }
    
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            if (method === "login") {
                api.login({username, password})
                .then(()=>handleLogin())
                .then(()=>navigate("/"));
            } else {
                api.register({username, password})
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
            onChange={(e) => dispatch(setKeepLoggedIn(e.target.checked))}
        />}
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form