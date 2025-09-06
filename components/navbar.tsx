import Link from "next/link";
import React from "react";
import Image from "next/image";
// import Modal from "./modal"
import Dropdown from "./dropdown";
import Modal from "./modal";

const Navbar = () => {
  return (
    <>
      <div className="bg-primary navbar fixed top-0 left-0 w-full z-50 p-0 h-16 shadow-lg">
        <div className="navbar-start">
          <Dropdown />

          <div className="w-30 lg:mx-6 flex-1">
            <Link href="/">
              <Image
                src="/imgs/templeLogo.png"
                alt="Shoes"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal gap-12 text-base-100 text-base">
            <li className="hover:cursor-pointer hover:text-base-300">
              <Link href="/signup">Sign Up</Link>
            </li>

            <li className="hover:cursor-pointer hover:text-base-300">
              <Link href="/practises/signup">Practises</Link>
            </li>

            <li className="hover:cursor-pointer hover:text-base-300">
              <Link href="/memberships">Memberships</Link>
            </li>

            <li className="hover:cursor-pointer hover:text-base-300">
              <Link href="/eboard">E-board</Link>
            </li>

            <li className="hover:cursor-pointer hover:text-base-300">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="text-secondary navbar-end">
          <label htmlFor="my_modal_7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="mx-6 text-base-100 transition-transform duration-300 hover:scale-120 active:scale-80 hover:cursor-pointer h-6 w-6"
              fill="currentColor"
            >
              <path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z" />
            </svg>
          </label>
          <Modal />
        </div>
      </div>
    </>
  );
};

export default Navbar;
