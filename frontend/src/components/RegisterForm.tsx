import "./RegisterForm.css";

export default function RegisterForm() {
  return (
    <div className="register__form">
      <form action="">
        <fieldset>
          <legend>Register</legend>

          <label htmlFor="CPF">CPF</label>
          <input id="CPF" type="text" />

          <label htmlFor="password">Senha</label>
          <input id="password" type="password" />

          <label htmlFor="name">Nome</label>
          <input id="name" type="text" />

          <label htmlFor="birthdate">Data de nascimento</label>
          <input id="birthdate" type="date" />

          <label htmlFor="address">Endereço</label>
          <input id="address" type="text" />

          <label htmlFor="gender">Genero sexual</label>
          <input id="gender" type="text" />

          <label htmlFor="height">Altura</label>
          <input id="height" type="number" />

          <label htmlFor="weight">Peso</label>
          <input id="weight" type="number" />

          <label htmlFor="dominant_side">Lado dominante</label>
          <select id="dominant_side">
            <option value="L">Esquerdo</option>
            <option value="R">Direito</option>
            <option value="B">Ambos</option>
          </select>
          <button type="submit">Enviar</button>
        </fieldset>
      </form>
    </div>
  );
}
