import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./CourtContainer.css";
import CourtItem from "./CourtItem";

export interface CourtType {
  ID: number;
  descricao: string;
  endereco: string;
  longitude: number;
  latitude: number;
}

interface CourtData {
  courts: CourtType[];
}

export default function CourtContainer() {
  const [courts, setCourts] = useState<CourtType[]>([]);

  async function fetchData() {
    const response = await api.get("/courts");
    setCourts(response.data.courts);
    console.log(courts);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="court__container">
      {!courts && <p>Carregando ...</p>}
      {courts &&
        courts.map((court) => <CourtItem key={court.ID} court={court} />)}
    </div>
  );
}
