import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,

      login: (user, token) =>
        set({
          user,
          token,
          isAuth: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuth: false,
        }),

      getToken: () => get().token,
    }),
    {
      name: "auth-storage", // 🔹 هذا هو key فـ localStorage
    }
  )
);

export default useAuthStore;
