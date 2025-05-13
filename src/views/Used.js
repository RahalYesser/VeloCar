import React, { useState, useEffect } from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";
import CarList from "../components/CarList.js";
import CarFilterPanel from "../components/CarFilterPanel";
import { getCars } from "../data/storage.js";

export default function Used() {
  const [cars, setCars] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchLaunched, setSearchLaunched] = useState(false);

  useEffect(() => {
    const storedCars = getCars();
    setCars(storedCars);
  }, []);

  const handleFilter = (filters) => {
    filters.isNew = false; // For used cars, automatically set isNew to false

    const allCars = getCars();
    let result = allCars.filter((car) => car.isNew === filters.isNew);
    console.log("Filtered cars before applying filters:", result); // Debugging the result array

    // Apply other filters
    if (filters.marque) result = result.filter((c) => c.marque === filters.marque);
    if (filters.model) result = result.filter((c) => c.model === filters.model);
    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      result = result.filter(
        (c) => c.price >= filters.priceMin && c.price <= filters.priceMax
      );
    }
    if (filters.kilometrage !== null)
      result = result.filter((c) => c.kilometrage <= filters.kilometrage);

    console.log("Filtered cars after applying filters:", result); // Debugging the result array

    setFiltered(result);
    setSearchLaunched(true);
  };

  return (
    <>
      <IndexNavbar fixed />
      <main className="mt-24">
        <div className="bg-black text-white p-4">
          <CarFilterPanel onSearch={handleFilter} isUsedPage={true} />
        </div>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">

                {searchLaunched && <CarList cars={filtered} />}{" "}
              </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
