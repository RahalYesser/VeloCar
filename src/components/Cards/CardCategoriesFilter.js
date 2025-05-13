import React, { useEffect, useState } from "react";

const CardCategoriesFilter = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carCategories")) || [];
    setCategories(stored);
  }, []);

  return (
    <>
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelect(cat)}
          className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-red-500"
        >
          <div className="text-4xl">{cat.icon}</div>
          <div className="text-sm mt-1 font-medium">{cat.name}</div>
        </div>
      ))}
    </div>
    </>
  );
};

export default CardCategoriesFilter;
