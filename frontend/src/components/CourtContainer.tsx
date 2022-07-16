import { CourtType } from "../pages/Court";
import "./CourtContainer.css";
import CourtItem from "./CourtItem";

interface CourtData {
  courts: CourtType[];
}

export default function CourtContainer(data: CourtType) {
  return (
    <div className="court__container">
      <CourtItem />
      <CourtItem />
      <CourtItem />
      <CourtItem />
      <CourtItem />
    </div>
  );
}
