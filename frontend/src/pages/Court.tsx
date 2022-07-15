import CourtContainer from "../components/CourtContainer";
import CourtRegister from "../components/CourtRegister";

import "./Court.css";

export default function Court() {
  return (
    <div className="court">
      <CourtContainer />
      <CourtRegister />
    </div>
  );
}
