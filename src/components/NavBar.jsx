import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaCaretDown } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponseMenu';

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {

  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState(false);

  // Toggle dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setOpenDropdown(prev => !prev);
  };

  // Click outside handler
  useEffect(() => {
    const closeDropdown = () => {
      setOpenDropdown(false);
    };
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0 relative z-[999]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* LEFT SIDE — LOGO + LOCATION */}
        <div className="flex gap-7 items-center">

          {/* Logo */}
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Cartzy</span>
            </h1>
          </Link>

          {/* Location */}
          <div
            className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden"
            onClick={toggleDropdown}
          >
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.country}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown />
          </div>

          {/* Dropdown */}
          {openDropdown && (
            <div
              className="w-[250px] shadow-2xl bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md z-[9999]"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location
                <span className="cursor-pointer" onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>

              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — MENU + AUTH + CART */}
        <nav className="flex gap-7 items-center">

          {/* Desktop Menu */}
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${isActive ? "border-b-4 border-red-500" : ""} cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>

            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${isActive ? "border-b-4 border-red-500" : ""} cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${isActive ? "border-b-4 border-red-500" : ""} cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>

            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${isActive ? "border-b-4 border-red-500" : ""} cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>

          {/* Auth */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu icon */}
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden"
            />
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;
