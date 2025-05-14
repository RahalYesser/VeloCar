import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CarCard from "../../components/Cards/CardCar";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [carData, setCarData] = useState({
    id: "",
    isNew: true,
    marque: "",
    model: "",
    type: "",
    price: 0,
    kilometrage: "",
    image: ""
  });
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState({ marques: [], models: {} });

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 5;

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars(storedCars);

    const rawCategories = JSON.parse(localStorage.getItem("carCategories")) || [];

    const formattedCategories = {
      marques: rawCategories.map((c) => c.marque),
      models: rawCategories.reduce((acc, c) => {
        acc[c.marque] = c.models;
        return acc;
      }, {}),
    };

    setCategories(formattedCategories);
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editing) {
      const updatedCars = cars.map((car) =>
        car.id === carData.id ? carData : car
      );
      setCars(updatedCars);
      localStorage.setItem("cars", JSON.stringify(updatedCars));
    } else {
      const newCar = { ...carData, id: uuidv4() };
      const newCars = [...cars, newCar];
      setCars(newCars);
      localStorage.setItem("cars", JSON.stringify(newCars));
    }
    resetForm();
  };

  const handleEdit = (car) => {
    setCarData(car);
    setEditing(true);
  };

  const handleDelete = (id) => {
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
    localStorage.setItem("cars", JSON.stringify(newCars));
  };

  const resetForm = () => {
    setCarData({
      id: "",
      isNew: true,
      marque: "",
      model: "",
      type: "",
      price: 0,
      kilometrage: "",
      image: ""
    });
    setEditing(false);
  };

  return (
    <div className="">
      <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t px-4 py-3 border-b border-gray-200 bg-gray-100">
          <h2 className="text-xl font-semibold text-blueGray-700">
            Car Management
          </h2>
        </div>

        <div className="p-4 bg-white border-b border-gray-100">
          <h3 className="text-md font-semibold mb-2 text-blueGray-600">
            {editing ? "Edit Car" : "Add New Car"}
          </h3>
          <div className="flex items-center gap-4">
            <input
              required
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setCarData((prev) => ({ ...prev, image: reader.result }));
                };
                if (file) reader.readAsDataURL(file);
              }}
              className="p-6 m-6 rounded border border-gray-300 text-sm"
            />
            {carData.image && (
              <img
                src={carData.image}
                alt="Car Preview"
                className="h-24 w-auto object-contain border m-2"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              required
              name="marque"
              value={carData.marque}
              onChange={(e) => {
                handleChange(e);
                setCarData((prev) => ({ ...prev, model: "" }));
              }}
              className="p-2 rounded border border-gray-300 text-sm"
            >
              <option value="">Select Brand</option>
              {categories.marques.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              required
              name="model"
              value={carData.model}
              onChange={handleChange}
              disabled={!carData.marque}
              className="p-2 rounded border border-gray-300 text-sm"
            >
              <option value="">Select Model</option>
              {(categories.models[carData.marque] || []).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            <input
              required
              name="type"
              value={carData.type}
              onChange={handleChange}
              placeholder="Type"
              className="p-2 rounded border border-gray-300 text-sm"
            />

            <input
              required
              type="number"
              name="price"
              value={carData.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-2 rounded border border-gray-300 text-sm"
            />

            <select
              required
              name="isNew"
              value={carData.isNew}
              onChange={(e) =>
                setCarData((prev) => ({
                  ...prev,
                  isNew: e.target.value === "true",
                }))
              }
              className="p-2 rounded border border-gray-300 text-sm"
            >
              <option value="true">New</option>
              <option value="false">Used</option>
            </select>

            {!carData.isNew && (
              <input
                required
                type="number"
                name="kilometrage"
                value={carData.kilometrage}
                onChange={handleChange}
                placeholder="Kilometrage"
                className="p-2 rounded border border-gray-300 text-sm"
              />
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              {editing ? "Update Car" : "Add Car"}
            </button>
            {editing && (
              <button
                onClick={resetForm}
                className="bg-gray-300 text-blueGray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="items-center w-full bg-transparent border-collapse text-sm">
            <thead>
              <tr className="bg-blueGray-100 text-blueGray-500 uppercase text-xs font-semibold border-b">
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-left">Model</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Condition</th>
                <th className="px-6 py-3 text-left">Kilometrage</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCars.map((car) => (
                <tr key={car.id} className="border-t">
                  <td className="px-6 py-3">{car.marque}</td>
                  <td className="px-6 py-3">{car.model}</td>
                  <td className="px-6 py-3">{car.type}</td>
                  <td className="px-6 py-3">${car.price}</td>
                  <td className="px-6 py-3">{car.isNew ? "New" : "Used"}</td>
                  <td className="px-6 py-3">
                    {car.isNew ? "-" : `${car.kilometrage} km`}
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    <Link
                      to={`/car/${car.id}`}
                      className="bg-indigo-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-indigo-600"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleEdit(car)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-indigo-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {cars.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-blueGray-400">
                    No cars found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center px-4 py-2 border-t bg-gray-50">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded text-sm bg-blueGray-100 hover:bg-blueGray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-blueGray-600 mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded text-sm bg-blueGray-100 hover:bg-blueGray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Car cards below table */}
        <div className="flex flex-wrap justify-center bg-blueGray-200 text-center mt-4">
          <div className="w-full">
            <div className="p-6 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-1">CARS</h2>
              <p className="text-center text-sm mb-4">OVERVIEW</p>
              <div className="flex justify-center mb-8">
                <div className="w-[200px] h-1 bg-red-600 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {currentCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCars;
