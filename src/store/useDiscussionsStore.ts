import { create } from "zustand";

import { DiscussionFormFields, DiscussionsStoreProps } from "../types";

export const useDiscussionsStore = create<DiscussionsStoreProps>((set) => ({
  discussions: [],
  isLoading: false,
  error: null,
  setDiscussions: (discussion: DiscussionFormFields) =>
    set((state) => ({
      discussions: [...state.discussions, discussion]
    })),
  removeDiscussion: (id: string) =>
    set((state) => ({
      discussions: state.discussions.filter((discussion) => discussion.id !== id)
    }))
}));
