import { create } from "zustand";

import { fetchItem } from "../api";
import { useAuthStoreProps } from "../types";

export const useAuthStore = create<useAuthStoreProps>((set, get) => ({
  userData: {
    username: "",
    email: "",
    password: ""
  },
  isLoading: false,
  error: null,
  success: false,
  setField: (field, value) => {
    set((state) => ({
      userData: { ...state.userData, [field]: value }
    }));
  },
  registerUser: async () => {
    const { email, password, username } = get().userData;
    set({ isLoading: true, error: null, success: false });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    };

    try {
      const response = await fetchItem<{ token: string }>("/register/", requestOptions);

      if (!response.ok) throw new Error("Ошибка регистрации. Попробуйте сначала");

      set({ success: true, userData: { email: "", password: "", username: "" } });
      location.href = "/";
    } catch (error: any) {
      set({ error: error.message || "Внезапная ошибка. Попробуйте сначала" });
    } finally {
      set({ isLoading: false });
    }
  }
}));
