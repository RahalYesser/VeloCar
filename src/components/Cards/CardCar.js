import React from "react";
import { Link } from "react-router-dom";

const CardCar = ({ car }) => (
  <Link to={`/car/${car.id}`} className="transform transition-transform hover:scale-105">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 w-full max-w-xs hover:shadow-xl transition-shadow duration-300">
      <img
        src={car.image}
        alt={car.model}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {car.marque} - {car.model}
      </h3>
      <p className="text-gray-500 mb-1">{car.type}</p>
      <p className="text-red-600 font-bold text-lg mb-1">${car.price}</p>
      {!car.isNew && (
        <p className="text-sm text-gray-400">{car.kilometrage} km</p>
      )}
    </div>
  </Link>
);

export default CardCar;
