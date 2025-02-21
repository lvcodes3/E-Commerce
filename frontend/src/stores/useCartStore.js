import { create } from "zustand";
import { toast } from "react-hot-toast";

import axiosClient from "../lib/axios.js";

const useCartStore = create((set, get) => ({
  loading: false,

  cart: [],

  coupon: null,

  subTotal: 0,

  total: 0,

  getCartProducts: async () => {
    try {
      set({ loading: true });

      const response = await axiosClient.get("/cart");

      set({
        loading: false,
        cart: response.data,
      });

      get().calculateTotals();
    } catch (error) {
      set({ loading: false, cart: [] });
      toast.error(error.response.data.message || "Get cart products error.");
    }
  },

  addToCart: async (product) => {
    try {
      set({ loading: true });

      await axiosClient.post("/cart", {
        productId: product._id,
      });

      toast.success("Product added to cart.");

      set({ loading: false });
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      set({ loading: false, cart: [] });
      toast.error(error.response.data.message || "Add to cart error.");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let total = subTotal;

    if (coupon) {
      const discount = subTotal * (coupon.discountPercentage / 100);
      total = subTotal - discount;
    }

    set({ subTotal, total });
  },
}));

export default useCartStore;
