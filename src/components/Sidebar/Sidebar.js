/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown.js";
import UserDropdown from "../Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const location = useLocation();
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  // Helper to check active link
  const isActive = (path) => location.pathname === path;


  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand */}
          <div className="flex justify-center items-center w-full">
            <Link to="/" className="block">
              <img
                alt="velocar"
                src={require("./../../assets/img/logo.png")}
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Velocar
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Search */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="mb-4 md:min-w-full" />

            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6>

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/dashboard")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/dashboard"
                >
                  <i
                    className={`fas fa-tv mr-2 text-sm ${
                      isActive("/admin/dashboard")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Dashboard
                </Link>
              </li>

            {/*   <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/settings")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/settings"
                >
                  <i
                    className={`fas fa-tools mr-2 text-sm ${
                      isActive("/admin/settings")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Settings
                </Link>
              </li> */}

  

              <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/forum")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/forum"
                >
                  <i
                    className={`fa-brands fa-forumbee mr-2 text-sm ${
                      isActive("/admin/forum")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Forum
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/cars")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/cars"
                >
                  <i
                    className={`fa-solid fa-car mr-2 text-sm ${
                      isActive("/admin/cars")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Cars
                </Link>
              </li>
               <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/carsCategories")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/carsCategories"
                >
                  <i
                    className={`fa-solid fa-layer-group mr-2 text-sm ${
                      isActive("/admin/carsCategories")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Cars Categories
                </Link>
              </li>
             {/*  <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/feedbacks")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/feedbacks"
                >
                  <i
                    className={`fa-solid fa-comments mr-2 text-sm ${
                      isActive("/admin/feedbacks")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Cars feedbacks
                </Link>
        
              </li> */}
              <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/orders")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/orders"
                >
                  <i
                    className={`fa-solid fa-cart-plus mr-2 text-sm ${
                      isActive("/admin/orders")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Orders
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/contacts")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/contacts"
                >
                  <i
                    className={`fa-solid fa-address-book mr-2 text-sm ${
                      isActive("/admin/contacts")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Contacts
                </Link>
        
              </li>
                          <li className="items-center">
                <Link
                  className={`text-xs uppercase py-3 font-bold block ${
                    isActive("/admin/users")
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }`}
                  to="/admin/users"
                >
                  <i
                    className={`fa-solid fa-address-book mr-2 text-sm ${
                      isActive("/admin/users")
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>
                  Users
                </Link>
        
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
