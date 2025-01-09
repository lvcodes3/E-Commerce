import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";

import { CreateProductForm } from "../components/CreateProductForm.jsx";
import { ProductsList } from "../components/ProductsList.jsx";
import { Analytics } from "../components/Analytics.jsx";

const Admin = () => {
  const tabs = [
    {
      id: "create",
      label: "Create Product",
      icon: PlusCircle,
    },
    {
      id: "products",
      label: "Products",
      icon: ShoppingBasket,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-gray-900">
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-4xl text-center text-emerald-400 font-bold"
        >
          Admin Dashboard
        </motion.h1>

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mx-2 px-4 py-2 flex items-center transition-colors duration-200 rounded-md ${
                activeTab === tab.id
                  ? "text-white bg-emerald-600"
                  : "text-gray-300 bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Based On Tab Selected */}
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
};

export default Admin;
