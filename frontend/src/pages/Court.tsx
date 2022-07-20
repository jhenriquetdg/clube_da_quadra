import { useState } from "react";
import CourtContainer from "../components/CourtContainer";
import CourtRegister from "../components/CourtRegister";

import "./Court.css";

export interface CourtType {
  ID: number;
  descricao: string;
  endereco: string;
  longitude: number;
  latitude: number;
}

export default function Court() {
  const [currentCourt, setCurrentCourt] = useState<CourtType>({
    ID: 0,
    descricao: "",
    endereco: "",
    longitude: -5.82,
    latitude: -35.21,
  });
  return (
    <div className="court">
      <CourtRegister currentCourt={currentCourt} />
      <CourtContainer
        currentCourt={currentCourt}
        setCurrentCourt={setCurrentCourt}
      />
    </div>
  );
}
