import React, { FC, useRef } from "react";
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

type TextChatProps = {
  chatMessages: { sender: string; text: string }[];
  websocket: WebSocket | null;
  username: string | null;
};

export const TextChat: FC<TextChatProps> = ({ chatMessages, websocket, username }) => {
  const chatInputRef = useRef<HTMLInputElement>(null);

  const sendChatMessage = () => {
    const message = chatInputRef.current?.value.trim();
    if (!message || !websocket || websocket.readyState !== WebSocket.OPEN) return;

    websocket.send(
      JSON.stringify({ event: "chat", sender: username || "Анонимный пользователь", text: message })
    );
    chatInputRef.current!.value = "";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendChatMessage();
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
        <Input ref={chatInputRef} type="text" onKeyDown={handleKeyPress} />
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
