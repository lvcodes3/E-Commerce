import { create } from "zustand";
import { toast } from "react-hot-toast";

import axiosClient from "../lib/axios.js";

const useProductStore = create((set) => ({
  loading: false,

  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (createProductFormData) => {
    try {
      set({ loading: true });

      const response = await axiosClient.post(
        "/product",
        createProductFormData
      );

      set((prevState) => ({
        loading: false,
        products: [...prevState.products, response.data],
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Create product error.");
    }
  },
}));

export default useProductStore;
