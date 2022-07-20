import { UserCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import "./Person.css";

interface PersonType {
    CPF: string;
    nome: string;
    dataNasc: string;
    genero: string;
    altura: number;
    peso: number;
    email: string;
    senha: string;
    ladoDominante: string;
}

export default function Person() {
    const [people, setPeople] = useState<PersonType[]>([]);

    async function fetchData() {
        const response = await api.get("/users");

        setPeople(response.data.users);
        console.log(people);
    }

    useEffect(() => {
        console.log("UseEffect");
        fetchData();
    }, []);

    return (
        <>
            <div className="person__container">
                <h1>Usuarios</h1>
                <button onClick={fetchData}>Fetch Data</button>

                {people?.map((person) => {
                    return (
                        <div key={person.CPF} className="person__card">
                            <UserCircle size={100} />
                            <p>{person.nome}</p>
                            <p>{person.dataNasc}</p>
                            <p>{person.email}</p>
                            <p>{person.altura} cm</p>
                            <p>{person.peso} kg</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
