import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import NavigationBar from "./components/NavigationBar"

function Logout(){
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register />
}

function App() {
  return (
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/"
          element={
              <Home/>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<RegisterAndLogout/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
