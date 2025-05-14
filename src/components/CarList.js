import React from "react";
import CarCard from "../components/Cards/CardCar";

const CarList = ({ cars }) => (
  <>
    <div className="flex flex-wrap justify-center bg-blueGray-200 text-center mb-24">
      <div className="w-full p-16">
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-1">NEW PRICE</h2>
          <p className="text-center text-sm mb-4">LATEST</p>
          <div className="flex justify-center mb-8">
            <div className="w-[200px] h-1 bg-red-600 rounded-full" />
          </div>

          {/* Check if cars array is empty */}
          {cars.length === 0 ? (
            <p className="text-xl text-red-500">There are no vehicles available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </>
);

export default CarList;
