import { useEffect, useState } from "react";
import { CourtType } from "../pages/Court";
import { api } from "../services/api";
import "./CourtContainer.css";
import CourtItem from "./CourtItem";

interface CourtData {
  courts: CourtType[];
}

interface CourtContainerProps {
  currentCourt: CourtType;
  setCurrentCourt: (court: CourtType) => void;
}

export default function CourtContainer({
  currentCourt,
  setCurrentCourt,
}: CourtContainerProps) {
  const [courts, setCourts] = useState<CourtType[]>([]);

  async function fetchData() {
    const response = await api.get("/courts");
    setCourts(response.data.courts);
    console.log(courts);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Container...s");
  return (
    <div className="court__container">
      {!courts && <p>Carregando ...</p>}
      {courts &&
        courts.map((court) => <CourtItem key={court.ID} court={court} />)}
    </div>
  );
}
