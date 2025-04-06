import { useState } from "react";

import { FormControl } from "@mui/material";

import { ContainerStyled } from "../../../styled.ts";
import { VideoChatInputsContainer, VideoChatStyled, VideoChatTitleStyled } from "./styled";

import { ButtonComponent, Input } from "../ui";

export const VideoChat = () => {
  const [room, setRoom] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <VideoChatStyled>
      <ContainerStyled>
        <VideoChatTitleStyled>
          Я хочу <span>присоединится</span> к комнате:
        </VideoChatTitleStyled>
        <FormControl sx={{ marginTop: "50px", width: "40%" }}>
          <VideoChatInputsContainer>
            <Input
              value={room}
              placeholder="vc4zas%#askqsd123vc4zas%#askqqsd3"
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
              value={username}
              placeholder="Максим Сергеевич"
              label="Под именем"
              onChange={(e) => setUsername(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              sx={{ width: "49%" }}
            />
          </VideoChatInputsContainer>
          <ButtonComponent
            color="primary"
            size="medium"
            variant="contained"
            style={{ width: "50%", margin: "20px auto 0 auto" }}>
            Присоедениться
          </ButtonComponent>
        </FormControl>
      </ContainerStyled>
    </VideoChatStyled>
  );
};
