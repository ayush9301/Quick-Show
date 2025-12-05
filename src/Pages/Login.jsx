import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../featurse/auth/authSlice";
import Loader from "../Hooks/Loader";

const Login = () => {
  const { user, userError, userMessage, userLoading, userSucces } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userError && userMessage) {
      toast.error(userMessage);
    }
    if (user) {
      navigate("/");
    }
  }, [user, userMessage]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (userLoading) {
    return <Loader />;
  }

  // useEffect(() => {
  //
  // }, [userError, userMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-white/20">
            <span className="text-4xl font-black text-white">MB</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mt-4">
            Welcome Back 🎬
          </h2>
          <p className="text-blue-200 mt-1 text-lg">
            Login to continue your booking
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blue-200 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/20 transition-all"
              placeholder="yourmail@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-blue-200 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 shadow-lg hover:scale-[1.02] transition-all"
          >
            Log In
          </button>
        </form>

        {/* REGISTER */}
        <p className="text-center text-blue-200 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
