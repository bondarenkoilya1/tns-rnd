import { create } from "zustand";

type ChatMessageProps = {
  sender: string;
  text: string;
};

type ChatMessagesStoreProps = {
  chatMessages: ChatMessageProps[];
  addChatMessage: (sender: string, text: string) => void;
};

export const useChatMessagesStore = create<ChatMessagesStoreProps>((set) => ({
  chatMessages: [],
  addChatMessage: (sender: string, text: string) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, { sender, text }]
    }))
}));
