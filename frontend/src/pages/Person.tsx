import { UserCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { X, Pencil } from "phosphor-react";

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

    async function deleteUser(CPF: string) {
        console.log("Deletando");
        await api.delete("/user", {
            data: {
                CPF: CPF,
            },
        });

        fetchData();
    }

    return (
        <>
            <div className="person__container">
                <h1>Usuarios</h1>
                <button onClick={fetchData}>Fetch Data</button>

                {people?.map((person) => {
                    return (
                        <div key={person.CPF} className="person__card">
                            <div className="control">
                                <button>
                                    <Pencil size={30} />
                                </button>
                                <button
                                    onClick={() => {
                                        deleteUser(person.CPF);
                                    }}
                                >
                                    <X size={30} />
                                </button>
                            </div>
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
