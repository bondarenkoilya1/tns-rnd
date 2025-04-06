import { create } from "zustand";

import { fetchItem } from "../api";
import { USER_API_URL } from "../config";
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
      const response = await fetchItem<{ token: string }>(
        USER_API_URL,
        "/register/",
        requestOptions
      );
      const token = response.token;
      localStorage.setItem("accessToken", token);

      set({ success: true, userData: { email: "", password: "", username: "" } });
    } catch (error: any) {
      set({ error: error.message || "Внезапная ошибка. Попробуйте сначала" });
    } finally {
      set({ isLoading: false });
    }
  },
  loginUser: async () => {
    const { email, password } = get().userData;
    set({ isLoading: true, error: null, success: false });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify({ email, password })
    };

    try {
      const response = await fetchItem<{ token: string }>(USER_API_URL, "/login/", requestOptions);
      const token = response.token;

      localStorage.setItem("accessToken", token);

      set({ success: true, userData: { email: "", password: "" } });
    } catch (error: any) {
      set({ error: error.message || "Ошибка входа. Попробуйте снова" });
    } finally {
      set({ isLoading: false });
    }
  }
}));
