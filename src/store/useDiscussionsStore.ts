import { create } from "zustand";

import { DiscussionFormFields, DiscussionsStoreProps } from "../types";

export const useDiscussionsStore = create<DiscussionsStoreProps>((set, get) => ({
  discussions: [],
  isLoading: false,
  error: null,
  setDiscussions: (discussion: DiscussionFormFields) => {
    set((state) => {
      const updatedDiscussions = [...state.discussions, discussion];
      console.log("Updated discussions:", updatedDiscussions);
      return { discussions: updatedDiscussions };
    });
  },
  removeDiscussion: (id: string) => {
    const { discussions } = get();
    const updatedDiscussions = discussions.filter((discussion) => discussion.id !== id);
    set({ discussions: updatedDiscussions });
  }
}));
