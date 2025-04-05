import { create } from "zustand";
import { DiscussionProps, DiscussionsStoreProps } from "../types";

export const useDiscussionsStore = create<DiscussionsStoreProps>((set) => ({
  discussions: [],
  isLoading: false,
  error: null,
  setDiscussions: (discussion: DiscussionProps) =>
    set((state) => ({
      discussions: [...state.discussions, discussion]
    })),
  removeDiscussion: (id: string) =>
    set((state) => ({
      discussions: state.discussions.filter((discussion) => discussion.id !== id)
    }))
}));
