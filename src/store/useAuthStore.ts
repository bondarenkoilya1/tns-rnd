import { create } from "zustand";
import { fetchItem } from "../api";

type UserProps = {
  username: string;
  email: string;
  password: string;
};

type useAuthStoreProps = {
  userData: UserProps;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  setField: <K extends keyof UserProps>(field: K, value: UserProps[K]) => void;
  register: () => Promise<void>;
};

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
  register: async () => {
    set({ isLoading: true, error: null, success: false });
    const { userData } = get();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    };

    try {
      const response = await fetchItem<{ token: string }>("/register", requestOptions);

      if (!response.ok) throw new Error("Ошибка регистрации");

      set({ success: true, userData: { username: "", email: "", password: "" } });
      location.href = "/";
    } catch (error: any) {
      set({ error: error.message || "Неизвестная ошибка" });
    } finally {
      set({ isLoading: false });
    }
  }
}));
