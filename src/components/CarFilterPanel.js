import React, { useState, useEffect } from "react";
import PriceSlider from "../components/Sliders/PriceSlider";

export default function CarFilterPanel({ onSearch, isUsedPage }) {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [isNew, setIsNew] = useState(null);  // null means no filter for isNew
  const [kilometrage, setKilometrage] = useState(null); // For kilometrage filter

  // Load categories from localStorage on mount
  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("carCategories"));
    if (categories) {
      setBrands(categories.marques || []);
    }
  }, []);

  // Update models when brand changes
  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("carCategories"));
    if (categories && selectedBrand) {
      setModels(categories.models[selectedBrand] || []);
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  const handleSearch = () => {
    const filters = {
      marque: selectedBrand,
      model: selectedModel,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      isNew:isNew,
      kilometrage: kilometrage  // For Used Cars, kilometrage filter
    };

    console.log("🔍 Launching search with filters:", filters);
    onSearch(filters);
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-1">FIND THE PRICE</h2>
      <p className="text-center text-sm mb-6">OF A VEHICLE</p>

      {/* Brand & Model */}
      <div className="flex gap-4 mb-6">
        <select
          className="w-1/2 p-2 rounded border border-red-500 bg-black text-white"
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            setSelectedModel("");
          }}
        >
          <option value="">Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          className="w-1/2 p-2 rounded border bg-black text-white"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedBrand}
        >
          <option value="">Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <PriceSlider priceRange={priceRange} onChange={setPriceRange} />

      {/* Kilometrage Input (Only for Used Cars) */}
      {isUsedPage && (
        <div className="mb-6">
          <label className="block text-sm">Kilometrage (max)</label>
          <input
            type="number"
            value={kilometrage}
            onChange={(e) => setKilometrage(e.target.value)}
            className="w-full p-2 rounded bg-black text-white"
            placeholder="Enter max kilometrage"
          />
        </div>
      )}

      {/* Search Button */}
      <div className="mt-6 text-right">
        <button
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold"
          onClick={handleSearch}
        >
          LAUNCH SEARCH
        </button>
      </div>
    </div>
  );
}
