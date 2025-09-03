// components/ProfileDropdown.jsx
import { useState, useRef, useEffect } from "react";
import {
  TbUser,
  TbSettings,
  TbReceiptRupee,
  TbHelpTriangle,
  TbLogout,
  TbHeart,
  TbShoppingCart,
  TbWallet,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileDropdown({ onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["auth-user"]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-16 w-60 bg-white border rounded-lg shadow-lg py-2 z-50">
          <li className="flex items-center gap-2 px-4 py-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h6 className="text-gray-900 font-semibold">
                {user?.name || "User"}
              </h6>
              <small className="text-gray-500">{user?.email || ""}</small>
            </div>
          </li>
          <hr className="my-1" />
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <TbUser className="text-lg" />
              My Profile
            </Link>
          </li>
          <li>
  <Link
    to="/orders"
    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
    onClick={() => setIsOpen(false)}
  >
    <TbShoppingCart className="text-lg" />
    Orders
  </Link>
</li>

<li>
  <Link
    to="/wallet"
    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
    onClick={() => setIsOpen(false)}
  >
    <TbWallet className="text-lg" />
    Wallet
  </Link>
</li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <TbSettings className="text-lg" />
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <TbReceiptRupee className="text-lg" />
              Billing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <TbHelpTriangle className="text-lg" />
              FAQs
            </a>
          </li>
          <hr className="my-1" />
          <li className="px-4 pt-1">
            <button
              onClick={onSignOut}
              className="flex items-center justify-center gap-2 bg-red-100 text-red-600 w-full py-2  font-medium"
            >
              <TbLogout className="text-red-600 text-lg" />
              Sign out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
