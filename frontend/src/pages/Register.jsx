import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";

const Register = () => {
  const loading = false;

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerFormData);
  };

  return (
    <div className="py-12 sm:px-6 lg:px-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sm:w-full sm:max-w-md sm:mx-auto"
      >
        <h1 className="mt-6 text-3xl text-center font-extrabold text-emerald-400">
          Register
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 sm:w-full sm:max-w-md sm:mx-auto"
      >
        <div className="px-4 sm:px-10 py-8 shadow sm:rounded-lg bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-300 font-medium"
              >
                Full Name
              </label>
              <div className="mt-1 relative shadow-sm rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User aria-hidden="true" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={registerFormData.name}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      name: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3 pl-10 py-2 block sm:text-sm placeholder-gray-400 bg-gray-700 shadow-sm border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 font-medium"
              >
                Email
              </label>
              <div className="mt-1 relative shadow-sm rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail aria-hidden="true" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerFormData.email}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      email: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3 pl-10 py-2 block sm:text-sm placeholder-gray-400 bg-gray-700 shadow-sm border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 font-medium"
              >
                Password
              </label>
              <div className="mt-1 relative shadow-sm rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock aria-hidden="true" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={registerFormData.password}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      password: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3 pl-10 py-2 block sm:text-sm placeholder-gray-400 bg-gray-700 shadow-sm border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm text-gray-300 font-medium"
              >
                Password Confirmation
              </label>
              <div className="mt-1 relative shadow-sm rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock aria-hidden="true" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="••••••••"
                  value={registerFormData.passwordConfirmation}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      passwordConfirmation: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3 pl-10 py-2 block sm:text-sm placeholder-gray-400 bg-gray-700 shadow-sm border border-gray-600 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

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
                  <UserPlus aria-hidden="true" className="w-5 h-5 mr-2" />
                  Register
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Login Here <ArrowRight className="w-4 h-4 inline" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
