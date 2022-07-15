import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Court from "./pages/Court";

import "./App.css";

function App() {
  return (
    <div className="login_form">
      <h1>Bem vindo ao clube da quadra</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/court" element={<Court />} />
      </Routes>
    </div>
  );
}

export default App;
