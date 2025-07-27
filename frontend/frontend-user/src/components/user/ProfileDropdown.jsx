// components/ProfileDropdown.jsx
import { useState, useRef, useEffect } from "react";
import {
  TbUser,
  TbSettings,
  TbReceiptRupee,
  TbHelpTriangle,
  TbLogout,
} from "react-icons/tb";

export default function ProfileDropdown({ onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

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
              <h6 className="text-gray-900 font-semibold">John Doe</h6>
              <small className="text-gray-500">Admin</small>
            </div>
          </li>
          <hr className="my-1" />
          <li>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <TbUser className="text-lg" />
              My Profile
            </a>
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
