import "./NavBar.css";
import { Binoculars, SignIn, SoccerBall, UsersThree } from "phosphor-react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div className="nav__bar">
      <Link to="/">
        <img src="../assets/olympiads.png" alt="" />
      </Link>
      <ul>
        <li>
          <Link to="#">
            <UsersThree size={48} />
            <span>Usuarios</span>
          </Link>
        </li>
        <li>
          <Link to="court">
            <Binoculars size={48} />
            <span>Quadras</span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <SoccerBall size={48} />
            <span>Partidas</span>
          </Link>
        </li>
        <li>
          <Link to="login">
            <SignIn size={48} />
            <span>Login</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
