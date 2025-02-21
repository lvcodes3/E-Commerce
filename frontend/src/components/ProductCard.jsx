import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

import useUserStore from "../stores/useUserStore.js";
import useCartStore from "../stores/useCartStore.js";

export const ProductCard = ({ product }) => {
  const { user } = useUserStore();

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    } else {
      toast.error("You must be logged in to shop!", { id: "login" });
    }
  };

  return (
    <div className="w-full relative flex flex-col overflow-hidden border border-gray-700 rounded-lg shadow-lg">
      <div className="h-60 mx-3 mt-3 relative flex overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={`${product.name} image`}
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl text-white font-semibold tracking-tight">
          {product.name}
        </h5>

        <div className="mt-2 mb-5 flex justify-between items-center">
          <p>
            <span className="text-3xl text-emerald-400 font-bold">
              ${product.price}
            </span>
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 flex justify-center items-center text-center text-sm text-white font-medium bg-emerald-600 hover:bg-emerald-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          <ShoppingCart size={22} className="mr-2" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};
