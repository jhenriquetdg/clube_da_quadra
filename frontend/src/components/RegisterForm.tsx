import "./RegisterForm.css";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const { register, handleSubmit, formState, getValues, setValue } =
        useForm();

    var x = navigator.geolocation.getCurrentPosition((position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
    });

    async function fetchCEP(e: any) {
        var CEP = e.target.value.replace(/\D/g, "");
        console.log(CEP);
        if (CEP.length === 8) {
            const response = await axios.get(
                `https://viacep.com.br/ws/${e.target.value}/json/`
            );

            setValue("logradouro", response.data.logradouro);
            setValue("numero", response.data.numero);
            setValue("complemento", response.data.complemento);
            setValue("bairro", response.data.bairro);
            setValue("uf", response.data.uf);
        }
    }

    function envioFormulario(data: any) {
        console.log(data);
    }

    return (
        <div className="register__form">
            <form onSubmit={handleSubmit(envioFormulario)}>
                <fieldset>
                    <legend>Registro</legend>

                    <label htmlFor="CPF">
                        CPF
                        {formState.errors.CPF && (
                            <span className="error">
                                Esse campo é obrigatório
                            </span>
                        )}
                    </label>
                    <input
                        {...register("CPF", { required: true })}
                        type="text"
                    />

                    <label htmlFor="senha">Senha</label>
                    <input {...register("senha")} type="password" />

                    <label htmlFor="email">E-mail</label>
                    <input {...register("email")} type="email" />

                    <label htmlFor="nome">Nome</label>
                    <input {...register("nome")} type="name" />

                    <label htmlFor="dataNasc">Data de nascimento</label>
                    <input {...register("dataNasc")} type="date" />

                    <label htmlFor="genero">Genero sexual</label>
                    <select {...register("genero")}>
                        <option value="M">Macho</option>
                        <option value="F">Fêmea</option>
                    </select>

                    <label htmlFor="altura">Altura</label>
                    <input {...register("altura")} type="number" />

                    <label htmlFor="peso">Peso</label>
                    <input {...register("peso")} type="number" />

                    <label htmlFor="ladoDominante">Lado dominante</label>
                    <select {...register("ladoDominante")}>
                        <option value="E">Esquerdo</option>
                        <option value="D">Direito</option>
                        <option value="A">Ambos</option>
                    </select>

                    <label htmlFor="CEP">CEP</label>
                    <input
                        {...register("CEP")}
                        type="text"
                        onChange={fetchCEP}
                    />

                    <label htmlFor="logradouro">Logradouro</label>
                    <input {...register("logradouro")} type="text" />

                    <label htmlFor="numero">Nº</label>
                    <input {...register("numero")} type="text" />

                    <label htmlFor="complemento">Complemento</label>
                    <input {...register("complemento")} type="text" />

                    <label htmlFor="bairro">Bairro</label>
                    <input {...register("bairro")} type="text" />

                    <label htmlFor="uf">Unidade Federativa</label>
                    <input {...register("uf")} type="text" />

                    <label htmlFor="longitude">Longitude</label>
                    <input
                        {...register("longitude")}
                        type="number"
                        step={0.0001}
                    />

                    <label htmlFor="latitude">Latitude</label>
                    <input
                        {...register("latitude")}
                        type="number"
                        step={0.0001}
                    />

                    <button type="submit">Enviar</button>
                </fieldset>
            </form>
        </div>
    );
}
