import { useState } from "react";
import CourtContainer, { CourtType } from "../components/CourtContainer";
import CourtRegister from "../components/CourtRegister";

import "./Court.css";

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
      <CourtRegister court={currentCourt} />
      <CourtContainer setCourt={setCurrentCourt} />
    </div>
  );
}
