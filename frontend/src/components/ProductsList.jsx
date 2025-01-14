import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";

import useProductStore from "../stores/useProductStore.js";

export const ProductsList = () => {
  const { products, deleteProduct, toggleIsFeaturedProduct } =
    useProductStore();

  const tableHeaderStyle =
    "px-6 py-3 text-xs text-left text-gray-300 font-medium uppercase tracking-wider";
  const tableDataStyle = "px-6 py-4 whitespace-nowrap";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-lg"
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th scope="col" className={tableHeaderStyle}>
              Name
            </th>
            <th scope="col" className={tableHeaderStyle}>
              Category
            </th>
            <th scope="col" className={tableHeaderStyle}>
              Price
            </th>
            <th scope="col" className={tableHeaderStyle}>
              Stock
            </th>
            <th scope="col" className={tableHeaderStyle}>
              Featured
            </th>
            <th scope="col" className={tableHeaderStyle}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700">
              {/* Name */}
              <td className={tableDataStyle}>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-white font-medium">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className={tableDataStyle}>
                <div className="text-sm text-gray-300">{product.category}</div>
              </td>

              {/* Price */}
              <td className={tableDataStyle}>
                <div className="text-sm text-gray-300">
                  {product.price.toFixed(2)}
                </div>
              </td>

              {/* Stock */}
              <td className={tableDataStyle}>
                <div className="text-sm text-gray-300">{product.stock}</div>
              </td>

              {/* Is Featured */}
              <td className={tableDataStyle}>
                <button
                  onClick={() => toggleIsFeaturedProduct(product._id)}
                  className={`p-1 ${
                    product.isFeatured
                      ? "text-gray-900 bg-yellow-400"
                      : "text-gray-300 bg-gray-600"
                  } transition-colors duration-200 rounded-full hover:bg-yellow-500`}
                >
                  <Star className="w-5 h-5" />
                </button>
              </td>

              {/* Actions */}
              <td className={`${tableDataStyle} text-sm font-medium`}>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
