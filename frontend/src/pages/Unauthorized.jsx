import { Link } from "react-router-dom"

function Unauthorized({login}) {
    return <div>
            <h1>401 Unauthorized</h1>
            <p>Sorry, you're not allowed to view that page...</p>
            {login && <p>Click <Link to="/login">here</Link> to login</p>}
        </div>
}

export default Unauthorized