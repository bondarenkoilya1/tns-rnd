import { create } from "zustand";

import { DiscussionFormFields, DiscussionsStoreProps } from "../types";

export const useDiscussionsStore = create<DiscussionsStoreProps>((set, get) => ({
  // mock
  discussions: [
    {
      title: "Стратегия компании на ближайшие 5 лет",
      description: "Какие приоритеты должны быть установлены для компании на ближайшие 5 лет?",
      votingType: "online",
      endTime: "2025-06-30T23:59:59Z"
    },
    {
      title: "Корпоративная социальная ответственность",
      description:
        "Какое направление корпоративной социальной ответственности нужно усилить в компании?",
      votingType: "offline",
      endTime: "2025-05-15T23:59:59Z"
    },
    {
      title: "Инновационные проекты и технологии",
      description:
        "Какие инновации или технологии должны быть приоритетными для внедрения в ближайшие годы?",
      votingType: "online",
      endTime: "2025-07-01T23:59:59Z"
    },
    {
      title: "Корпоративная культура",
      description:
        "Какие изменения в корпоративной культуре необходимы для улучшения внутренней атмосферы в компании?",
      votingType: "offline",
      endTime: "2025-06-10T23:59:59Z"
    }
  ],
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
