export type MeetingItemProps = {
  id: string;
  registration_link: string;
  date?: string;
  admin?: string;
};

export type MeetingListStoreProps = {
  meetings: MeetingItemProps[];
  isLoading: boolean;
  error: string | null;
  setMeetings: (meeting: MeetingItemProps) => void;
  removeMeeting: (id: string) => void;
};
