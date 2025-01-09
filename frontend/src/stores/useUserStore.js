import { create } from "zustand";
import { toast } from "react-hot-toast";

import axiosClient from "../lib/axios.js";

const useUserStore = create((set) => ({
  loading: false,

  user: null,

  checkingAuth: false,

  register: async (registerFormData) => {
    try {
      set({ loading: true });

      const response = await axiosClient.post(
        "/user/register",
        registerFormData
      );

      set({ loading: false, user: response.data });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Register error.");
    }
  },

  login: async (loginFormData) => {
    try {
      set({ loading: true });

      const response = await axiosClient.post("/user/login", loginFormData);

      set({ loading: false, user: response.data });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Login error.");
    }
  },

  checkAuth: async () => {
    try {
      set({ checkingAuth: true });

      const response = await axiosClient.get("/user/profile");

      set({ checkingAuth: false, user: response.data });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      toast.error(error.response.data.message || "Check auth error.");
    }
  },

  logout: async () => {
    try {
      await axiosClient.post("/user/logout");
      set({ user: null });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      toast.error(error.response.data.message || "Logout error.");
    }
  },
}));

export default useUserStore;

// TODO: implement the axios interceptors for refreshing the access token
