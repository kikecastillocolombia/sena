import { useSelector } from 'react-redux';
import { Navbar } from "./components/Navbar/Navbar";
import Appointments from "./views/Appointments/Apointments";
import { CreateAppointment } from "./views/CreateAppointment/CreateAppointment";
import Detail from "./views/Detail/Detail";
import Home from "./views/Home/Home";
import LandingPage from "./views/LandingPage/LandingPage";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import { useLocation } from 'react-router-dom';

function App() {
    const {pathname} = useLocation()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // Imprime el valor de isLoggedIn en la consola
    console.log('isLoggedIn:', isLoggedIn);

    return (
        <>
         
         {pathname !== "/" && pathname !== "/home" && isLoggedIn ? <Navbar /> : null}
            
            <div style={{ width: "70vw", margin: "auto" }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/appointment" 
                        element={isLoggedIn ? <Appointments /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/appointment/schedule" 
                        element={isLoggedIn ? <CreateAppointment /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/appointment/:id" 
                        element={isLoggedIn ? <Detail /> : <Navigate to="/login" />} 
                    />
                    <Route path="/*" element={<ErrorPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
