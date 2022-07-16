import { useEffect, useState } from "react";
import CourtContainer from "../components/CourtContainer";
import CourtRegister from "../components/CourtRegister";
import { api } from "../services/api";

import "./Court.css";

export interface CourtType {
  descricao: string;
  endereco: string;
}

export default function Court() {
  const [data, setData] = useState<CourtType[]>([]);

  async function fetchData() {
    const response = await api.get("/getallcourts");
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="court">
      <CourtContainer courts={data} />
      <CourtRegister />
    </div>
  );
}
