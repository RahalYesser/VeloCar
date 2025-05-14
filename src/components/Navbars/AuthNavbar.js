/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import PagesDropdown from "../Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              <img
                alt="velocar"
                src={require("./../../assets/img/logo.png")}
                className="h-28 w-auto"
              />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* <li className="flex items-center">
                <PagesDropdown />
              </li> */}
              <li className="flex items-center">
                <Link
                  to="/new"
                  className={`px-3 py-4 lg:py-2 flex items-center text-base uppercase font-bold ${
                    location.pathname === "/new"
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                  }`}
                >
                  New
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/used"
                  className={`px-3 py-4 lg:py-2 flex items-center text-base uppercase font-bold ${
                    location.pathname === "/used"
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                  }`}
                >
                  Used Cars
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/forum"
                  className={`px-3 py-4 lg:py-2 flex items-center text-base uppercase font-bold ${
                    location.pathname === "/forum"
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                  }`}
                >
                  Forum
                </Link>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-700">Active</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
