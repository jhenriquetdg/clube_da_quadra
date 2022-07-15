import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm() {
  const [CPF, setCPF] = useState();
  return (
    <div className="login__form">
      <form action="">
        <fieldset>
          <legend>Login</legend>

          <label htmlFor="CPF">CPF</label>
          <input id="CPF" type="text" value={CPF} />

          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={CPF} />

          <button type="submit">Enviar</button>
          <button type="submit">Cadastre-se</button>
        </fieldset>
      </form>
    </div>
  );
}
