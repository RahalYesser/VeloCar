// File: pages/New.js
import React, { useEffect, useState } from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";
import CarList from "../components/CarList.js";
import CarFilterPanel from "../components/CarFilterPanel";
import CarBrandCard from "../components/Cards/CardCarBrands.js";
import carBrands from "../data/carBrands";
import { getCars, saveCars } from "../data/storage.js";
import { initCarCategories } from "../data/initCarCategories";
import { initCars } from "../data/initCars";

export default function New() {
  const [cars, setCars] = useState([]);
  const [filtered, setFiltered] = useState(cars);
  const [searchLaunched, setSearchLaunched] = useState(false);

  // Initial cars setup (run once)
  useEffect(() => {
    initCarCategories();
    initCars();

    const storedCars = getCars();
    setCars(storedCars);
  }, []);

  const handleFilter = (filters) => {
    // For New Cars, we set isNew to true automatically
    filters.isNew = true;

    const allCars = getCars();
    let result = allCars.filter((car) => car.isNew === filters.isNew);

    // Apply other filters
    if (filters.marque)
      result = result.filter((c) => c.marque === filters.marque);
    if (filters.model) result = result.filter((c) => c.model === filters.model);
    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      result = result.filter(
        (c) => c.price >= filters.priceMin && c.price <= filters.priceMax
      );
    }

    //console.log("Filtered cars after applying filters:", result); // Debugging the result array
    setFiltered(result);
    setSearchLaunched(true);
  };

  return (
    <>
      <IndexNavbar fixed />
      <main className="mt-32">
        <div className="bg-black text-white p-4">
          <CarFilterPanel onSearch={handleFilter} isUsedPage={false} />
        </div>
        <div className="max-w-6xl mx-auto"></div>

        <section className="pt-20 pb-48">
          <div className="container mx-auto  px-4">

                {searchLaunched && <CarList cars={filtered} />}{" "}
            

            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">All cars brand</h2>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center ">
              {carBrands.map((brand, index) => (
                <CarBrandCard
                  key={index}
                  name={brand.name}
                  image={brand.image}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
