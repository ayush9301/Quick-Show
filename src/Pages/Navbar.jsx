"use client";

import { Search, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LogOut } from "../featurse/auth/authSlice";
// import { LogoutUser } from "../featurse/auth/authSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const isSpecialPage =
    location.pathname.startsWith("/movie") &&
    location.pathname.includes("/theater");

  const isSeats = location.pathname === "/seats";
  const isAdmin = location.pathname === "/admin";
  const isUser = location.pathname === "/profile";
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isUpcoming = location.pathname === "/upcoming";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(LogOut());
    setProfileOpen(false);
  };

  return (
    <nav
      className={`px-6 md:px-12 lg:px-20 py-4 z-50 ${
        isSpecialPage ||
        isSeats ||
        isAdmin ||
        isUser ||
        isLogin ||
        isRegister ||
        isUpcoming
          ? "static"
          : "fixed top-0"
      } w-full bg-gradient-to-b from-black/60 to-transparent`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold flex items-center gap-1">
          <span className="text-blue-500 hover:text-red-500 ">Quick</span>
          <span className="text-white hover:text-yellow-500">Show</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
          <Link
            to="/"
            className="text-white hover:text-red-500 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-white hover:text-red-500 transition font-medium"
          >
            Movies
          </Link>
          <Link
            to="/upcoming"
            className="text-white hover:text-red-500 transition font-medium"
          >
            Upcoming
          </Link>
          {/* <Link
            to="/events"
            className="text-white hover:text-red-500 transition font-medium"
          >
            Events
          </Link> */}
          {!user?.isAdmin ? (
            <></>
          ) : (
            <Link
              to="/admin"
              className=" text-blue-300 hover:text-red-500 transition font-medium"
            >
              Hi Admin
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          {/* <button className="text-white hover:text-red-400">
            <Search size={24} />
          </button> */}

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <Link
              to="/profile"
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-800 "
            >
              {user ? user.name?.charAt(0)?.toUpperCase() : "?"}
            </Link>

            {/* DROPDOWN MENU */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-40   rounded-lg shadow-lg p-3 b">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block py-2 px-3 rounded hover:bg-white/10"
                      onClick={() => setProfileOpen(false)}
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="block py-2 px-3 rounded hover:bg-white/10"
                      onClick={() => setProfileOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-white hover:text-red-500"
          >
            Home
          </Link>
          <Link
            to="/movies"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-white hover:text-red-500"
          >
            Movies
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
