import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user-type";

interface AuthStore {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token: string | null) => set({ token }),
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;