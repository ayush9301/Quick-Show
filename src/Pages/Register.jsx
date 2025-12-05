// UI — Register Page (Same Movie-Booking Blue Theme as Login)

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterUser } from "../featurse/auth/authSlice";
import Loader from "../Hooks/Loader";

const Register = () => {
  const { user, userMessage, userError, userLoading } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userError && userMessage) toast.error(userMessage);
    if (user) navigate("/");
  }, [user, userMessage, userError]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));
    // console.log("runnn");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (userLoading) {
    return <Loader />;
  }
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600  text-white px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border border-blue-400/40">
            <span className="text-3xl">🎬</span>
          </div>
          <h2 className="text-4xl font-extrabold mt-4 text-white drop-shadow-md">
            Create Account
          </h2>
          <p className="text-blue-200 mt-1 text-lg">
            Join and start booking your seats 🎟️
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/8 backdrop-blur-xl border border-blue-300/30 shadow-2xl rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 font-semibold text-blue-200">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/40 text-white rounded-xl border border-blue-300/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="John Doe"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-semibold text-blue-200">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/40 text-white rounded-xl border border-blue-300/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="9876543210"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold text-blue-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/40 text-white rounded-xl border border-blue-300/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold text-blue-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/40 text-white rounded-xl border border-blue-300/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="••••••••"
              />

              <label className="block mt-3 mb-1 font-semibold text-blue-200">
                Confirm Password
              </label>

              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/40 text-white rounded-xl border border-blue-300/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-blue-300/40 bg-blue-900/40"
              />
              <span className="ml-2 text-sm text-blue-200">Remember me</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-xl hover:scale-[1.03] transition-transform"
            >
              Register
            </button>
          </form>

          {/* Go to Login */}
          <p className="text-center text-blue-200 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-300 hover:text-white font-semibold"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
