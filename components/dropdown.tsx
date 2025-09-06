import Link from "next/link";
import React from "react";

const Dropdown = () => {
  return (
    <>
      <div className="dropdown">
        <button
          role="button"
          className=" lg:hidden mx-6 text-base-100 transition-transform duration-300 hover:scale-120 active:scale-80 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content bg-secondary z-1 [width:100vw] text-base-100  text-xl [&>li:not(.exclude)]:px-8 mt-4"
        >
          <li className="flex items-center gap-1 exclude h-9 bg-base-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-6 h-6 text-secondary ml-8"
              fill="currentColor"
            >
              <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
            </svg>
            <a className="text-primary font-semibold hover:cursor-pointer">
              Philadelphia, PA
            </a>
          </li>
          <li className="transition-transform duration-300 hover:scale-101 active:scale-99 hover:cursor-pointer py-3.5 hover:text-primary">
            <Link href="/signup">Sign Up</Link>
          </li>{" "}
          <hr />
          <li className="transition-transform duration-300 hover:scale-101 active:scale-99 hover:cursor-pointer py-3.5 hover:text-primary">
            <Link href="/practises/signup">Practises</Link>
          </li>{" "}
          <hr />
          <li className="transition-transform duration-300 hover:scale-101 active:scale-99 hover:cursor-pointer py-3.5 hover:text-primary">
            <Link href="/memberships">Memberships</Link>
          </li>{" "}
          <hr />
          <li className="transition-transform duration-300 hover:scale-101 active:scale-99 hover:cursor-pointer py-3.5 hover:text-primary">
            <Link href="/eboard">E-Board</Link>
          </li>{" "}
          <hr />
          <li className="transition-transform duration-300 hover:scale-101 active:scale-99 hover:cursor-pointer py-3.5 hover:text-primary">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
