import { create } from "zustand";

import { MeetingItemProps, MeetingListStoreProps } from "../types";

export const useMeetingListStore = create<MeetingListStoreProps>((set, get) => ({
  meetings: [],
  isLoading: false,
  error: null,
  setMeetings: (meeting: MeetingItemProps) => {
    set((state) => {
      const updatedMeetings = [...state.meetings, meeting];
      return { meetings: updatedMeetings };
    });
  },
  removeMeeting: (id: string) => {
    const { meetings } = get();
    const updatedMeetings = meetings.filter((meeting) => meeting.id !== id);
    set({ meetings: updatedMeetings });
  }
}));
