import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      <div className="pt-20 relative z-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;