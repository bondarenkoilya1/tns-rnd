export type ChatMessageProps = {
  sender: string;
  text: string;
};

export type ChatMessagesStoreProps = {
  chatMessages: ChatMessageProps[];
  addChatMessage: (sender: string, text: string) => void;
};
