import "./CourtContainer.css";
import CourtItem from "./CourtItem";

export default function CourtContainer() {
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
