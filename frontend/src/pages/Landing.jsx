import { motion } from "framer-motion";
import {
  Apple,
  ShoppingCart,
  Shirt,
  BadgeDollarSign,
  Smartphone,
  Package,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center gap-10"
      >
        <h1 className="text-5xl font-bold">E-Commerce</h1>

        <div className="flex flex-wrap justify-center items-center gap-10">
          <Apple aria-hidden="true" className="w-10 h-10" />
          <ShoppingCart aria-hidden="true" className="w-10 h-10" />
          <Shirt aria-hidden="true" className="w-10 h-10" />
          <BadgeDollarSign aria-hidden="true" className="w-10 h-10" />
          <Smartphone aria-hidden="true" className="w-10 h-10" />
          <Package aria-hidden="true" className="w-10 h-10" />
        </div>

        <p>Need to buy or sell items?</p>

        <p>You are in the right place. We are here to help you.</p>
      </motion.div>
    </div>
  );
};

export default Landing;
