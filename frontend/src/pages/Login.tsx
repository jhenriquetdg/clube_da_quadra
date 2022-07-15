import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
