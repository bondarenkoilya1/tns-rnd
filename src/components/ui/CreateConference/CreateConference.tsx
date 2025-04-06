import { useState } from "react";

import { FormControl } from "@mui/material";

import { ContainerStyled } from "../../../../styled";
import {
  CreateConferenceInputsContainer,
  CreateConferenceStyled,
  CreateConferenceTitleStyled
} from "./styled";

import { fetchItem } from "../../../api";
import { VIDEO_CHAT_API_URL } from "../../../config";
import { ButtonComponent } from "../Button";
import { Input } from "../Input";

export const CreateConference = () => {
  const [room, setRoom] = useState("");
  const [roomPin, setRoomPin] = useState("");
  const [responseUri, setResponseUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createRoom = async (room: string, roomPin: string) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: room,
        password: roomPin
      })
    };

    try {
      const response = await fetchItem<{ uri: string }>(
        VIDEO_CHAT_API_URL,
        "/create-room",
        requestOptions
      );
      setResponseUri(response.uri);
      setError(null);
    } catch (error: any) {
      setError(`Ошибка при создании комнаты, попробуйте снова`);
      setResponseUri(null);
    }
  };

  const copyRoomPin = () => {
    navigator.clipboard.writeText(roomPin);
  };

  return (
    <CreateConferenceStyled>
      <ContainerStyled>
        <CreateConferenceTitleStyled>
          Я хочу <span>создать</span> конференцию:
        </CreateConferenceTitleStyled>
        <FormControl sx={{ marginTop: "50px", width: "40%" }}>
          <CreateConferenceInputsContainer>
            <Input
              value={room}
              placeholder="meetup-2025"
              label="С идентификатором"
              onChange={(e) => setRoom(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              sx={{ width: "49%" }}
            />
            <Input
              value={roomPin}
              placeholder="5656"
              label="С паролем"
              onChange={(e) => setRoomPin(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              sx={{ width: "49%" }}
            />
          </CreateConferenceInputsContainer>
          <ButtonComponent
            onClick={() => {
              createRoom(room, roomPin);
              copyRoomPin();
            }}
            color="warning"
            size="medium"
            variant="contained"
            style={{ width: "50%", margin: "20px auto 0 auto" }}>
            Создать
          </ButtonComponent>
          <p style={{ color: "grey", fontSize: "12px", margin: "10px auto 0 auto" }}>
            При создании конференции, пароль от нее будет скопирован в ваш буфер обмена
          </p>

          {error && (
            <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</div>
          )}

          {responseUri && (
            <a
              href={responseUri}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "20px",
                textAlign: "center",
                color: "#1976d2",
                textDecoration: "underline"
              }}>
              Перейти в созданную комнату
            </a>
          )}
        </FormControl>
      </ContainerStyled>
    </CreateConferenceStyled>
  );
};
