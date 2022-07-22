import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Court from "./pages/Court";
import Person from "./pages/Person";
import Register from "./pages/Register";

import "./App.css";
import Address from "./pages/Address";

function App() {
    return (
        <div className="login_form">
            <div className="container">
                <h1 className="welcome-text">Bem vindo ao clube da quadra</h1>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/people" element={<Person />} />
                    <Route path="/court" element={<Court />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
