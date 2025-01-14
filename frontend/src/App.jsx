import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import useUserStore from "./stores/useUserStore.js";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Category from "./pages/Category.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import { Navbar } from "./components/Navbar.jsx";
import { LoadingSpinner } from "./components/LoadingSpinner.jsx";

const App = () => {
  const { user, checkingAuth, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 relative z-50">
        <Navbar />

        <Routes>
          <Route path="/landing" element={<Landing />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? <Admin /> : <Navigate to="/" />
            }
          />

          <Route path="/category/:category" element={<Category />} />

          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      {/* Toast Content */}
      <Toaster />
    </div>
  );
};

export default App;
