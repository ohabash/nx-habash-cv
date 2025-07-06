"use client";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi"; 

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative block text-left mb-4">

      {/* Trigger */}
      <div className="w-full level input m-0" onClick={e => setIsOpen(v => !v)}> 
        <div className="level-left 3">Options </div>
        <div className="level-right"><BiChevronDown /></div>
      </div>

      {/*
        Dropdown menu, show/hide based on menu state.1
        --------------------------------------------
        Entering:   "transition ease-out duration-100"
            From:   "transform opacity-0 scale-95"
              To:   "transform opacity-100 scale-100"
         Leaving:   "transition ease-in duration-75"
            From:   "transform opacity-100 scale-100"
              To:   "transform opacity-0 scale-95"
      */}
      {isOpen && <div
        className="absolute bg-dark/95 backdrop-blur-xl text-white right-0 z-10 mt-2 w-full origin-top-right rounded-md __bg-white shadow-lg focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {/* <!-- Active: "bg-gray-100 text-gray-900 outline-none", Not Active: " --> */}
          <a
            href="#"
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            Account settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-1"
          >
            Support
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-2"
          >
            License
          </a>
          <form method="POST" action="#" role="none">
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>}

    </div>
  );
};
