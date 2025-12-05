"use client";

import { Mail, Phone, MapPin, Github, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const isAdmin = location.pathname === "/admin";
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";

  return (
    <footer
      className={
        isAdmin || login || register
          ? "hidden"
          : " relative bg-black border-t border-slate-800 text-slate-300"
      }
    >
      <div className="absolute  inset-0 w-full h-full">
        <img
          src="https://i.pinimg.com/1200x/67/1c/f5/671cf59ff59393be6e93326276503411.jpg"
          alt=""
          className="w-full h-full object-cover object-center bg-cover brightness-30"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-slate-50 mb-4">
              About QuickShow
            </h3>
            <p className="text-sm leading-relaxed">
              Your ultimate destination for booking movie tickets and renting
              the latest films. Experience cinema with QuickShow.
            </p>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-slate-50 mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:blue-purple-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-50 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@QuickShow.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> 123 Cinema Lane, CA
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-slate-50 mb-4 hover:bg-blue-600">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-slate-800 rounded hover:bg-blue-600 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded hover:bg-blue-600 transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded hover:bg-blue-600 transition"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2025 QuickShow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
