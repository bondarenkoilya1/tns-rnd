import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Link, Typography } from "@mui/material";

import { ContainerStyled } from "../../../../styled.ts";

import { fetchItem } from "../../../api";
import { TEMPORARY_ACCESS_TOKEN, USER_API_URL } from "../../../config";
import { useMeetingListStore } from "../../../store";
import { MeetingItemProps } from "../../../types";
import { formatDate } from "../../../utils";

export const MeetingList = () => {
  const { meetings, setMeetings } = useMeetingListStore();

  useEffect(() => {
    const getMeetingList = async () => {
      try {
        const requestOptions = {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${TEMPORARY_ACCESS_TOKEN}`
          }
        };

        const response = await fetchItem<MeetingItemProps[]>(
          USER_API_URL,
          "/meeting_list/",
          requestOptions
        );
        setMeetings(response[0] || []);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    getMeetingList();
  }, [setMeetings]);

  return (
    <ContainerStyled>
      <div style={{ textAlign: "center", marginBottom: "24px", paddingTop: "40px" }}>
        <h2 style={{ fontSize: "24px" }}>Актуальные конференции для вас</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "30px"
          }}>
          {meetings &&
            meetings.map((meeting) => (
              <div
                key={uuidv4()}
                style={{
                  padding: "16px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}>
                <p style={{ marginBottom: "8px" }}>
                  Идентификатор конференции:
                  <span style={{ fontWeight: "bold" }}>{meeting.id}</span>
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <Typography component="span" style={{ fontWeight: "normal" }}>
                    Ссылка-приглашение:
                  </Typography>{" "}
                  <Link
                    href={meeting.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "bold"
                    }}>
                    перейти
                  </Link>
                </p>
                {meeting.date && (
                  <p style={{ marginBottom: "8px" }}>
                    <Typography component="span" style={{ fontWeight: "normal" }}>
                      Дата проведения:
                    </Typography>{" "}
                    <span style={{ fontWeight: "bold" }}>{formatDate(meeting.date)}</span>
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </ContainerStyled>
  );
};
