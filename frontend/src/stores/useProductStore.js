import { create } from "zustand";
import { toast } from "react-hot-toast";

import axiosClient from "../lib/axios.js";

const useProductStore = create((set) => ({
  loading: false,

  products: [],

  setProducts: (products) => set({ products }),

  getAllProducts: async () => {
    try {
      set({ loading: true });

      const response = await axiosClient.get("/product");

      set({
        loading: false,
        products: response.data,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Get all products error.");
    }
  },

  getProductsByCategory: async (category) => {
    try {
      set({ loading: true });

      const response = await axiosClient.get(`/product/category/${category}`);

      set({
        loading: false,
        products: response.data,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Get products by category error."
      );
    }
  },

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

  toggleIsFeaturedProduct: async (productId) => {
    try {
      set({ loading: true });

      const response = await axiosClient.patch(`/product/${productId}`);

      set((prevState) => ({
        loading: false,
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Toggle is featured product error."
      );
    }
  },

  deleteProduct: async (productId) => {
    try {
      set({ loading: true });

      await axiosClient.delete(`/product/${productId}`);

      set((prevState) => ({
        loading: false,
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Delete product error.");
    }
  },
}));

export default useProductStore;
