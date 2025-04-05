import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Укажите название опроса" }),
  description: z.string(),
  votingType: z.enum(["online", "offline"], {
    required_error: "Выберите тип голосования"
  }),
  endTime: z.string().min(1, { message: "Укажите дату окончания опроса" })
});

export type DiscussionProps = z.infer<typeof schema>;

export type DiscussionsStoreProps = {
  discussions: DiscussionProps[];
  isLoading: boolean;
  error: string | null;
  setDiscussions: (discussion: DiscussionProps) => void;
  removeDiscussion: (id: string) => void;
};
