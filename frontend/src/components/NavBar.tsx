import "./NavBar.css";
import {
    AddressBook,
    Binoculars,
    SignIn,
    SoccerBall,
    UsersThree,
} from "phosphor-react";
import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <div className="nav__bar">
            <div className="content">
                <Link to="/">
                    <img
                        id="olimpics-logo"
                        src="../assets/olympiads.png"
                        alt=""
                    />
                </Link>
                <ul>
                    <li>
                        <Link to="/people">
                            <UsersThree size={20} />
                            <span>Usuarios</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/address">
                            <UsersThree size={20} />
                            <span>Enderços</span>
                        </Link>
                    </li>

                    {/* <li>
                        <Link to="court">
                            <Binoculars size={20} />
                            <span>Quadras</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <SoccerBall size={20} />
                            <span>Partidas</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="login">
                            <SignIn size={20} />
                            <span>Login</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link to="Register">
                            <AddressBook size={20} />
                            <span>Registrar-se</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
