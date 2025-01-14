import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader, Upload, PlusCircle } from "lucide-react";

import useProductStore from "../stores/useProductStore.js";

export const CreateProductForm = () => {
  const categories = [
    "Jeans",
    "T-Shirts",
    "Shoes",
    "Glasses",
    "Jackets",
    "Suits",
    "Bags",
  ];

  const [createProductFormData, setCreateProductFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const { loading, createProduct } = useProductStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCreateProductFormData({
          ...createProductFormData,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file); // base64 encoding
    }
  };

  const validateData = () => {
    // trim values //
    setCreateProductFormData({
      ...createProductFormData,
      name: createProductFormData.name.trim(),
      description: createProductFormData.description.trim(),
    });

    // required fields //
    if (
      !createProductFormData.name ||
      !createProductFormData.description ||
      !createProductFormData.category ||
      !createProductFormData.price ||
      !createProductFormData.stock ||
      !createProductFormData.image
    ) {
      toast.error("All fields are required.");
      return false;
    }

    // naming convention //
    const nameBlocks = createProductFormData.name.split(" ");
    for (let i = 0; i < nameBlocks.length; i++) {
      nameBlocks[i] =
        nameBlocks[i][0].toUpperCase() + nameBlocks[i].slice(1).toLowerCase();
    }
    setCreateProductFormData({
      ...createProductFormData,
      name: nameBlocks.join(" "),
    });

    // validation //
    if (!categories.includes(createProductFormData.category)) {
      toast.error("Invalid category selected.");
      return false;
    }

    if (createProductFormData.price < 0) {
      toast.error("Invalid price.");
      return false;
    }

    if (createProductFormData.stock < 0) {
      toast.error("Invalid stock.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateData()) {
      await createProduct(createProductFormData);

      setCreateProductFormData({
        name: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        image: "",
      });
    }
  };

  const labelStyle = "block text-sm text-gray-300 font-medium";
  const inputStyle =
    "w-full mt-1 px-3 py-2 block text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl mx-auto mb-8 p-8 bg-gray-800 rounded-lg shadow-lg"
    >
      <h1 className="mb-6 text-2xl font-semibold text-emerald-300">
        Create New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={createProductFormData.name}
            onChange={(e) =>
              setCreateProductFormData({
                ...createProductFormData,
                name: e.target.value,
              })
            }
            required
            className={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelStyle}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={createProductFormData.description}
            onChange={(e) =>
              setCreateProductFormData({
                ...createProductFormData,
                description: e.target.value,
              })
            }
            required
            className={`${inputStyle}`}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className={labelStyle}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={createProductFormData.category}
            onChange={(e) =>
              setCreateProductFormData({
                ...createProductFormData,
                category: e.target.value,
              })
            }
            required
            className={inputStyle}
          >
            <option value="">Select A Category</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className={labelStyle}>
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={0.01}
            value={createProductFormData.price}
            onChange={(e) =>
              setCreateProductFormData({
                ...createProductFormData,
                price: e.target.value,
              })
            }
            required
            className={inputStyle}
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className={labelStyle}>
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min={0}
            step={1}
            value={createProductFormData.stock}
            onChange={(e) =>
              setCreateProductFormData({
                ...createProductFormData,
                stock: e.target.value,
              })
            }
            required
            className={inputStyle}
          />
        </div>

        {/* Upload Image Button */}
        <div className="mt-1 flex items-center">
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />
          <label
            htmlFor="image"
            className="px-3 py-2 leading-4 text-sm text-gray-300 font-medium cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload aria-hidden="true" className="w-5 h-5 mr-2 inline-block" />
            Upload Image
          </label>
          {createProductFormData.image && (
            <span className="ml-3 text-sm text-gray-400">Image Uploaded</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 flex justify-center text-sm text-white font-medium transition duration-150 ease-in-out bg-emerald-600 hover:bg-emerald-700 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader
                aria-hidden="true"
                className="w-5 h-5 mr-2 animate-spin"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle aria-hidden="true" className="w-5 h-5 mr-2" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
