import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CarCategories = () => {
  const [brands, setBrands] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [brandData, setBrandData] = useState({ name: "", image: "" });
  const [modelData, setModelData] = useState({ marque: "", newModel: "" });
  const [editingBrand, setEditingBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 5;

  useEffect(() => {
    const storedBrands = JSON.parse(localStorage.getItem("carBrands")) || [];
    setBrands(storedBrands);

    const storedCategories = JSON.parse(localStorage.getItem("carCategories"));
    if (Array.isArray(storedCategories)) {
      setCarCategories(storedCategories);
    } else {
      setCarCategories([]);
    }
  }, []);

  const handleBrandChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBrand = () => {
    if (!brandData.name || !brandData.image) return;

    if (editingBrand) {
      const updatedBrands = brands.map((b) =>
        b.id === editingBrand.id ? { ...editingBrand, ...brandData } : b
      );
      setBrands(updatedBrands);
      localStorage.setItem("carBrands", JSON.stringify(updatedBrands));
    } else {
      const newBrand = { ...brandData, id: uuidv4() };
      const updatedBrands = [...brands, newBrand];
      setBrands(updatedBrands);
      localStorage.setItem("carBrands", JSON.stringify(updatedBrands));

      const exists = carCategories.find((cat) => cat.marque === newBrand.name);
      if (!exists) {
        const updatedCategories = [
          ...carCategories,
          { marque: newBrand.name, models: [], type: "" },
        ];
        setCarCategories(updatedCategories);
        localStorage.setItem("carCategories", JSON.stringify(updatedCategories));
      }
    }

    setBrandData({ name: "", image: "" });
    setEditingBrand(null);
  };

  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setBrandData({ name: brand.name, image: brand.image });
  };

  const handleDeleteBrand = (id) => {
    const brandToDelete = brands.find((b) => b.id === id);
    const updatedBrands = brands.filter((b) => b.id !== id);
    setBrands(updatedBrands);
    localStorage.setItem("carBrands", JSON.stringify(updatedBrands));

    // Also remove from categories
    const updatedCategories = carCategories.filter(
      (cat) => cat.marque !== brandToDelete.name
    );
    setCarCategories(updatedCategories);
    localStorage.setItem("carCategories", JSON.stringify(updatedCategories));
  };

  const handleModelChange = (e) =>
    setModelData((prev) => ({ ...prev, newModel: e.target.value }));

  const handleAddModel = () => {
    if (!modelData.marque || !modelData.newModel) return;

    const updatedCategories = carCategories.map((cat) =>
      cat.marque === modelData.marque
        ? {
            ...cat,
            models: [...new Set([...(cat.models || []), modelData.newModel])],
          }
        : cat
    );
    setCarCategories(updatedCategories);
    localStorage.setItem("carCategories", JSON.stringify(updatedCategories));
    setModelData({ ...modelData, newModel: "" });
  };

  const handleDeleteModel = (marque, model) => {
    const updatedCategories = carCategories.map((cat) =>
      cat.marque === marque
        ? {
            ...cat,
            models: (cat.models || []).filter((m) => m !== model),
          }
        : cat
    );
    setCarCategories(updatedCategories);
    localStorage.setItem("carCategories", JSON.stringify(updatedCategories));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  return (
    <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t px-4 py-3 border-b border-gray-200 bg-gray-100">
        <h2 className="text-xl font-semibold text-blueGray-700">Car Categories</h2>
      </div>

      {/* Brand Form */}
      <div className="p-4 bg-white border-b border-gray-100">
        <h3 className="text-md font-semibold mb-2 text-blueGray-600">
          {editingBrand ? "Edit Brand" : "Add New Brand"}
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setBrandData((prev) => ({ ...prev, image: reader.result }));
              };
              if (file) reader.readAsDataURL(file);
            }}
            className="p-6 m-6 rounded border border-gray-300 text-sm"
          />
          {brandData.image && (
            <img
              src={brandData.image}
              alt="Brand Preview"
              className="h-24 w-auto object-contain border m-2"
            />
          )}
        </div>
        <input
          name="name"
          value={brandData.name}
          onChange={handleBrandChange}
          placeholder="Brand Name"
          className="p-2 rounded border border-gray-300 text-sm"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddBrand}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            {editingBrand ? "Update Brand" : "Add Brand"}
          </button>
          {editingBrand && (
            <button
              onClick={() => {
                setBrandData({ name: "", image: "" });
                setEditingBrand(null);
              }}
              className="bg-gray-300 text-blueGray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Add Model */}
      <div className="p-4 bg-white border-b border-gray-100">
        <h3 className="text-md font-semibold mb-2 text-blueGray-600">Add Model</h3>
        <select
          value={modelData.marque}
          onChange={(e) =>
            setModelData({ ...modelData, marque: e.target.value })
          }
          className="p-2 rounded border border-gray-300 text-sm"
        >
          <option value="">Select Brand</option>
          {carCategories.map((cat, idx) => (
            <option key={idx} value={cat.marque}>
              {cat.marque}
            </option>
          ))}
        </select>
        <div className="flex gap-4 mt-2">
          <input
            type="text"
            value={modelData.newModel}
            onChange={handleModelChange}
            placeholder="Model Name"
            className="p-2 rounded border border-gray-300 text-sm"
          />
          <button
            onClick={handleAddModel}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Add Model
          </button>
        </div>
      </div>

      {/* Brands Table */}
      <div className="overflow-x-auto p-4">
        <h3 className="text-md font-semibold mb-2 text-blueGray-600">Brands</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blueGray-100 text-blueGray-500 uppercase text-xs font-semibold border-b">
              <th className="px-6 py-3 text-left">Brand</th>
              <th className="px-6 py-3 text-left">Logo</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.map((brand) => (
              <tr key={brand.id} className="border-t">
                <td className="px-6 py-3">{brand.name}</td>
                <td className="px-6 py-3">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-12 w-auto object-contain"
                  />
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => handleEditBrand(brand)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-indigo-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(brand.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-blueGray-400">
                  No brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination */}
      <div className="flex justify-center space-x-2 py-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBrand >= brands.length}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Models Table */}
      <div className="overflow-x-auto p-4">
        <h3 className="text-md font-semibold mb-2 text-blueGray-600">Models</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blueGray-100 text-blueGray-500 uppercase text-xs font-semibold border-b">
              <th className="px-6 py-3 text-left">Brand</th>
              <th className="px-6 py-3 text-left">Models</th>
            </tr>
          </thead>
          <tbody>
            {carCategories.map((cat, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-3">{cat.marque}</td>
                <td className="px-6 py-3">
                  {(cat.models || []).map((model, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{model}</span>
                      <button
                        onClick={() => handleDeleteModel(cat.marque, model)}
                        className="text-red-600 text-xs hover:text-red-800 ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
            {carCategories.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center py-4 text-blueGray-400">
                  No models found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default CarCategories;
