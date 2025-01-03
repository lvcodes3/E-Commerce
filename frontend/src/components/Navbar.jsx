import { Link } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";

export const Navbar = () => {
  const user = false;
  const isAdmin = false;

  return (
    <header className="w-full fixed top-0 left-0 z-40 transition-all duration-300 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="space-x-2 flex items-center text-2xl text-emerald-400 font-bold"
          >
            E-Commerce
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  size={20}
                  className="mr-1 inline-block group-hover:text-emerald-400"
                />
                <span className="hidden sm:inline">Cart</span>
                <span className="px-2 py-0.5 absolute -top-2 -left-2 text-xs text-white rounded-full transition duration-300 ease-in-out bg-emerald-500 group-hover:bg-emerald-400">
                  3
                </span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-1 flex items-center text-white font-medium transition duration-300 ease-in-out rounded-md bg-emerald-700 hover:bg-emerald-600"
              >
                <Lock size={18} className="mr-1 inline-block" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button className="px-4 py-2 flex items-center text-white transition duration-300 ease-in-out rounded-md bg-gray-700 hover:bg-gray-600">
                <LogOut size={18} />
                <span className="ml-2 hidden sm:inline">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="py-2 px-4 flex items-center text-white transition duration-300 ease-in-out rounded-md bg-emerald-600 hover:bg-emerald-700"
                >
                  <UserPlus size={18} className="mr-2" />
                  Register
                </Link>

                <Link
                  to="/login"
                  className="py-2 px-4 flex items-center text-white transition duration-300 ease-in-out rounded-md bg-gray-700 hover:bg-gray-600"
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
