import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Court from "./pages/Court";

import "./App.css";
import Person from "./pages/Person";

function App() {
    return (
        <div className="login_form">
            <div className="container">
                <h1 className="welcome-text">Bem vindo ao clube da quadra</h1>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/people" element={<Person />} />
                    <Route path="/court" element={<Court />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
