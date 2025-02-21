import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import categories from "../data/categories.js";

import useProductStore from "../stores/useProductStore.js";

import { ProductCard } from "../components/ProductCard.jsx";

const Category = () => {
  const navigate = useNavigate();

  const { category } = useParams();

  if (!categories.includes(category)) {
    navigate("/");
  }

  const { products, getProductsByCategory } = useProductStore();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-4xl sm:text-5xl text-center text-emerald-400 font-bold"
        >
          {category}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6"
        >
          {products.length === 0 && (
            <h2 className="col-span-full text-center text-3xl text-gray-300 font-semibold">
              No {category} Found
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Category;
