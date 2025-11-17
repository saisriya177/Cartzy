import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ResponsiveMenu({ openNav, setOpenNav }) {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      {/* Profile Section */}
      <div>
        <div className="flex items-center justify-start gap-3">
          {user ? <UserButton /> : <FaUserCircle size={50} />}
          <div>
            <h1>Hello, {user?.firstName || "User"}</h1>
            <h1 className="text-sm text-slate-500">Premium User</h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link to="/" onClick={() => setOpenNav(false)}>
              <li>Home</li>
            </Link>
            <Link to="/products" onClick={() => setOpenNav(false)}>
              <li>Products</li>
            </Link>
            <Link to="/about" onClick={() => setOpenNav(false)}>
              <li>About</li>
            </Link>
            <Link to="/contact" onClick={() => setOpenNav(false)}>
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* Mobile Signin Section */}
      <div className="mt-10">
        <SignedOut>
          <SignInButton className="bg-red-500 text-white w-full py-2 rounded-md" />
        </SignedOut>

        <SignedIn>
          <div className="flex justify-center">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
