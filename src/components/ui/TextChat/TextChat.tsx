import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../Input";
import { ButtonComponent } from "../Button";
import {
  TextChatContainerStyled,
  TextChatContentStyled,
  TextChatFooterStyled,
  TextChatHelperTextStyled,
  TextChatMessagesListStyled,
  TextChatMessageStyled,
  TextChatStyled,
  TextChatTitleContainerStyled,
  TextChatTitleStyled
} from "./styled";
import { useChatMessagesStore } from "../../../store";

type TextChatProps = {
  chatMessages: { sender: string; text: string }[];
  websocket: WebSocket | null;
  username: string | null;
};

export const TextChat: FC<TextChatProps> = ({ chatMessages, websocket, username }) => {
  const { addChatMessage } = useChatMessagesStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    addChatMessage("Mihel", "Hi, amigo");
    addChatMessage("Артем", "Привет");
  }, []);

  const sendChatMessage = () => {
    const message = inputValue;
    if (!message || !websocket || websocket.readyState !== WebSocket.OPEN) return;

    websocket.send(JSON.stringify({ event: "chat", sender: username, text: message }));
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendChatMessage();
  };

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TextChatStyled>
      <TextChatContainerStyled>
        <TextChatContentStyled>
          <TextChatTitleContainerStyled>
            <TextChatTitleStyled>Начните общаться здесь</TextChatTitleStyled>
          </TextChatTitleContainerStyled>
          <TextChatMessagesListStyled>
            {chatMessages.map((message) => (
              <TextChatMessageStyled key={uuidv4()}>
                <span>{message.sender}:</span> {message.text}
              </TextChatMessageStyled>
            ))}
          </TextChatMessagesListStyled>
        </TextChatContentStyled>
        <TextChatFooterStyled>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              value={inputValue}
              onChange={handleInputValue}
              type="text"
              placeholder="Андрей Анатольевич, у вас выключен звук!"
              onKeyDown={handleKeyPress}
              style={{ width: "70%" }}
            />
            <ButtonComponent
              onClick={sendChatMessage}
              size="medium"
              variant="contained"
              color="primary"
              style={{ width: "25%" }}>
              Написать
            </ButtonComponent>
          </Box>
          <TextChatHelperTextStyled>
            Вы отображаетесь как <span>{username ? username : "Анонимный пользователь"}</span>
          </TextChatHelperTextStyled>
        </TextChatFooterStyled>
      </TextChatContainerStyled>
    </TextChatStyled>
  );
};
