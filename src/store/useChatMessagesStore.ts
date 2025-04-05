import { create } from "zustand";

import { ChatMessagesStoreProps } from "../types";

export const useChatMessagesStore = create<ChatMessagesStoreProps>((set) => ({
  chatMessages: [],
  addChatMessage: (sender: string, text: string) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, { sender, text }]
    }))
}));
