import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";

import car_profile from '../assets/img/car_profile.jpg';

export default function Profile() {
  const defaultProfileImage = require("../assets/img/pdp.jpg").default;
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    work: "",
    age: "",
    description: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setUserName(currentUser.name);
        setEditForm({
          name: currentUser.name || "",
          location: currentUser.location || "",
          work: currentUser.work || "",
          age: currentUser.age || "",
          description: currentUser.description || ""
        });
        if (currentUser.profileImage) {
          const img = new Image();
          img.onerror = () => setProfileImage(defaultProfileImage);
          img.src = currentUser.profileImage;
          if (img.complete) {
            setProfileImage(currentUser.profileImage);
          }
        }
      }
    } catch (error) {
      console.error("Error reading user data from localStorage:", error);
      setProfileImage(defaultProfileImage);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          setProfileImage(reader.result);
          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser) {
            currentUser.profileImage = reader.result;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
          }
        } catch (error) {
          console.error("Error saving profile image:", error);
          setProfileImage(defaultProfileImage);
        }
      };
      reader.onerror = () => {
        console.error("Error reading file:", file.name);
        setProfileImage(defaultProfileImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const updatedUser = {
        ...currentUser,
        ...editForm
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUserName(editForm.name);
      setIsEditing(false);
      loadUserData();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${car_profile})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div 
                      className="relative"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <img
                        alt="profile picture"
                        src={profileImage}
                        className="shadow-xl rounded-full h-40 w-40 object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      />
                      <label 
                        htmlFor="profile-image-upload"
                        className={`absolute inset-0 w-40 h-40 rounded-full -m-16 -ml-20 lg:-ml-16 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer transition-opacity duration-200 ${
                          isHovering ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <span className="text-white text-sm">Change Photo</span>
                      </label>
                      <input
                        type="file"
                        id="profile-image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <div className="flex justify-center items-center mb-4">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                      {userName}
                    </h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>

                  {!isEditing ? (
                    <>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        {editForm.location || "Location"}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                        {editForm.work || "Work"}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                        {editForm.age || "Age"}
                      </div>
                    </>
                  ) : (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={editForm.name}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                              type="text"
                              name="location"
                              value={editForm.location}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Work</label>
                            <input
                              type="text"
                              name="work"
                              value={editForm.work}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                              type="text"
                              name="age"
                              value={editForm.age}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                              name="description"
                              value={editForm.description}
                              onChange={handleInputChange}
                              rows="3"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            ></textarea>
                          </div>
                          <div className="flex justify-end space-x-3 mt-4">
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {editForm.description || "Description"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
