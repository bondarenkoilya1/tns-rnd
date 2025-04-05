import { z } from "zod";

export const discussionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Укажите название опроса" }),
  description: z.string(),
  votingType: z.enum(["online", "offline"], {
    required_error: "Выберите тип голосования"
  }),
  endTime: z.string().min(1, { message: "Укажите дату окончания опроса" })
});

export type DiscussionFormFields = z.infer<typeof discussionSchema>;

export type DiscussionsStoreProps = {
  discussions: DiscussionFormFields[];
  isLoading: boolean;
  error: string | null;
  setDiscussions: (discussion: DiscussionFormFields) => void;
  removeDiscussion: (id: string) => void;
};
