import { FC } from "react";
import { DiscussionProps } from "../../../types";

export const Discussion: FC<DiscussionProps> = ({ title, description, votingType, endTime }) => {
  return (
    <div style={{ border: "1px solid #000", padding: "15px", borderRadius: "4px" }}>
      <div style={{ fontSize: "24px", fontWeight: "700" }}>Опрос на тему «{title}»</div>
      <p>{description}</p>
      <div
        style={{
          border: "1px solid #000",
          padding: "10px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          width: "400px"
        }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="agree">За</label>
          <input type="radio" name={title} id="yes" value="yes" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="didNotDecide">Воздержусь</label>
          <input type="radio" name={title} id="abstain" value="abstain" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="disagree">Против</label>
          <input type="radio" name={title} id="no" value="no" />
        </div>
        <button>Установить выбранный голос</button>
      </div>
      <p>Тип голосования: {votingType}</p>
      <p>Дата и время подведения итогов: {endTime}</p>
    </div>
  );
};
