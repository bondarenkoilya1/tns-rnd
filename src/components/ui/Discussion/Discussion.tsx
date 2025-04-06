import { FC } from "react";

import { DiscussionFormFields } from "../../../types";
import { formatDate } from "../../../utils";
import { ButtonComponent } from "../Button";

export const Discussion: FC<DiscussionFormFields> = ({
  title,
  description,
  votingType,
  endTime
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f7fafd",
        border: "1px solid #bec3cb",
        padding: "15px",
        borderRadius: "4px",
        margin: "20px 0"
      }}>
      <div style={{ fontSize: "24px", fontWeight: "700" }}>
        Опрос на тему <span style={{ color: "#4848f4" }}>«{title}»</span>
      </div>
      <p style={{ marginTop: "10px" }}>{description}</p>
      <div
        style={{
          border: "1px solid #000",
          padding: "15px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          width: "600px",
          marginTop: "20px"
        }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="agree">За</label>
          <input style={{ marginTop: "10px" }} type="radio" name={title} id="yes" value="yes" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="didNotDecide">Воздержусь</label>
          <input
            style={{ marginTop: "10px" }}
            type="radio"
            name={title}
            id="abstain"
            value="abstain"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="disagree">Против</label>
          <input style={{ marginTop: "10px" }} type="radio" name={title} id="no" value="no" />
        </div>
        <ButtonComponent color="primary" size="medium" variant="outlined">
          Установить выбранный голос
        </ButtonComponent>
      </div>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: "50px" }}>
          <span style={{ fontWeight: 700 }}>{votingType === "offline" ? "Оффлайн" : "Онлайн"}</span>{" "}
          голосование
        </p>
        <p style={{ fontWeight: 700 }}>{formatDate(endTime)}</p>
      </div>
    </div>
  );
};
