import Unauthorized from "../pages/Unauthorized"
import { useSelector } from "react-redux"

function ProtectedRoute({children}){
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    if (isLoggedIn === null){
        return <div>Loading...</div>
    }

    return isLoggedIn? children :
        <Unauthorized login={true}/>
}

export default ProtectedRoute