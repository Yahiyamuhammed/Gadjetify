// src/components/Navbar.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/react.svg"; // Replace with your logo
import toast from "react-hot-toast";

import { useLogoutMutation } from "@/hooks/mutations/useLogoutMutation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthUser } from "@/hooks/useAuthUser";
import ProfileDropdown from "./user/ProfileDropdown";
import { useFetchCartCount } from "@/hooks/queries/useCartQuery";
import { Badge } from "@/components/ui/badge";

import { ShoppingCart, Heart } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();
  const toggleRef = useRef();
  const navigate = useNavigate();

  const { mutate: logouMutate, isError, isSuccess } = useLogoutMutation();

  const { data: user, isLoading: userLoading } = useAuthUser();
  const { data: cartCount } = useFetchCartCount({ enabled: Boolean(user) });

  // console.log("this is the user in navbar", !!user);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "PRODUCTS", path: "/products" },
    { name: "CONTACT", path: "" },
    { name: "ABOUT US", path: "" },
    ...(user
      ? [
          { name: "Wishlist", path: "/wishlist" },
          { name: "Cart", path: "/cart" },
        ]
      : []),
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    logouMutate(null, {
      onSuccess: (res) => {
        toast.success("signout successfull", res.message);
      },
      onError: (err) => {
        toast.error("signout failed", err);
      },
    });

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    Navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-gray-700 shadow-md px-6 lg:px-16 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2  cursor-default">
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-lg font-bold text-black">Gadjetify</span>
      </Link>

      {/* Center Nav Links (Desktop Only) */}
      <ul className="hidden lg:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <li key={link.name}>
            {link.name === "Cart" ? (
              <Link to={link.path} className="relative flex items-center">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="h-5 min-w-5 rounded-full px-1 mb-5 font-mono tabular-nums">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            ) : link.name === "Wishlist" ? (
              <Link to={link.path} className="relative flex items-center">
                <Heart className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to={link.path}
                className={`hover:text-blue-600 transition-colors duration-300 ${
                  isActive(link.path) ? "text-black font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Right Auth Buttons (Desktop Only) */}
      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          // <button
          //   onClick={handleLogout}
          //   className="px-4 py-1 rounded-full text-red-600 hover:bg-red-50 transition"
          // >
          //   SIGN OUT
          // </button>
          <ProfileDropdown
            userName="Jane Doe"
            userRole="Editor"
            avatarSrc="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
            onSignOut={handleLogout}
          />
        ) : (
          <>
            <Link to="/login">
              <button
                className={`px-4 py-1 rounded-full transition-colors duration-300 ${
                  isActive("/login")
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                LOGIN
              </button>
            </Link>
            <Link to="/signup">
              <button
                className={`px-4 py-1 rounded-full transition-colors duration-300 ${
                  isActive("/signup")
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                SIGN UP
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div ref={toggleRef} className="lg:hidden text-gray-700">
        <FontAwesomeIcon
          icon={faBars}
          size="lg"
          className="cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Menu (unchanged) */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-white shadow-md z-50 flex flex-col items-center py-6 gap-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive(link.path)
                  ? "text-black font-bold"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-1 w-10" />

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button
              className={`px-6 py-2 rounded-full ${
                isActive("/login")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              LOGIN
            </button>
          </Link>

          <Link to="/signup" onClick={() => setMenuOpen(false)}>
            <button
              className={`px-6 py-2 rounded-full ${
                isActive("/signup")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              SIGN UP
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
