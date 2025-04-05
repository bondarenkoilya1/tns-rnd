import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../Input";
import { ButtonComponent } from "../Button";
import {
  TextChatHelperTextStyled,
  TextChatMessagesListStyled,
  TextChatMessageStyled,
  TextChatStyled,
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
      <TextChatTitleStyled>Начните общаться здесь</TextChatTitleStyled>
      <TextChatMessagesListStyled>
        {chatMessages.map((message) => (
          <TextChatMessageStyled key={uuidv4()}>
            <span>{message.sender}:</span> {message.text}
          </TextChatMessageStyled>
        ))}
      </TextChatMessagesListStyled>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          value={inputValue}
          onChange={handleInputValue}
          type="text"
          onKeyDown={handleKeyPress}
        />
        <ButtonComponent
          onClick={sendChatMessage}
          size="medium"
          variant="contained"
          color="primary">
          Send
        </ButtonComponent>
      </Box>
      <TextChatHelperTextStyled>
        Вы отображаетесь как <span>{username ? username : "Анонимный пользователь"}</span>
      </TextChatHelperTextStyled>
    </TextChatStyled>
  );
};
