import { useState } from "react";

export default function PriceSlider({ priceRange, onChange }) {
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= priceRange.max) onChange({ min: value, max: priceRange.max });
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= priceRange.min) onChange({ min: priceRange.min, max: value });
  };

  return (
    <div className="mb-6">
      <p className="mb-2">PRICE:</p>
      <p className="mb-4">
        FROM <span className="font-bold">{priceRange.min.toLocaleString()} $</span> TO{" "}
        <span className="font-bold">{priceRange.max.toLocaleString()} $</span>
      </p>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="500000"
          step="1000"
          value={priceRange.min}
          onChange={handleMinChange}
          className="w-1/2"
        />
        <input
          type="range"
          min="0"
          max="500000"
          step="1000"
          value={priceRange.max}
          onChange={handleMaxChange}
          className="w-1/2"
        />
      </div>
    </div>
  );
}
