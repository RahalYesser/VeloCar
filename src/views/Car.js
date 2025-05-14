import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";
import carBrands from "../data/carBrands";
import FeedbackForm from "../components/FeedbackForm";
import { initFeedbacks } from "../data/initFeedbacks.js";

export default function Car() {
  const { id } = useParams(); // Get car id from the URL
  const [car, setCar] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    carId: id,
    fullName: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    initFeedbacks();

    // Load car details from localStorage
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    const carDetails = storedCars.find((car) => car.id === id);
    setCar(carDetails);

    // Load feedbacks from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const carFeedbacks = storedFeedbacks.filter(
      (feedback) => feedback.carId === id
    );
    setFeedbacks(carFeedbacks);
  }, [id]);

  if (!car) return <p>Loading...</p>;

  const brandImage = carBrands.find(
    (brand) => brand.name === car.marque
  )?.image;

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      ...orderData,
      carId: car.id,
      carModel: `${car.marque} ${car.model}`,
      createdAt: new Date().toISOString(),
    };

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    alert("Order placed successfully!");
    setShowModal(false);
    setOrderData({ fullName: "", email: "", mobile: "", address: "" });
  };

  return (
    <>
      <IndexNavbar fixed />
      <div className="my-24 mx-auto p-6">
        <div className="p-6 max-w-6xl mx-auto text-gray-800">
          <h2 className="text-2xl font-bold text-center mb-1">
            {car.marque} {car.model}
          </h2>
          <p className="text-center text-sm mb-4">
            {brandImage && (
              <div className="text-center text-sm">
                <img
                  src={brandImage}
                  alt={`${car.marque} logo`}
                  className="w-16 mx-auto"
                />
              </div>
            )}
          </p>
          <div className="flex justify-center mb-4">
            <div className="w-[200px] h-1 bg-red-600 rounded-full" />
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            {car.image && (
              <img
                src={car.image}
                alt="Car"
                className="w-full h-auto object-contain border rounded"
              />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              {car.marque} {car.model}
            </h2>
            <div className="space-y-4">
              <p>
                <strong>Type:</strong> {car.type}
              </p>
              <p>
                <strong>Price:</strong> ${car.price}
              </p>
              <p>
                <strong>Condition:</strong> {car.isNew ? "New" : "Used"}
              </p>
              <p>
                <strong>Kilometrage:</strong>{" "}
                {car.isNew ? "N/A" : `${car.kilometrage} km`}
              </p>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Order This Car
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-1">FEEDBACKS</h2>
          <div className="flex justify-center mb-4">
            <div className="w-[200px] h-1 bg-red-600 rounded-full" />
          </div>

          <FeedbackForm carId={car.id} />

          <h3 className="text-xl font-semibold mb-4">
            Reviews for this vehicle
          </h3>
          {feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((feedback, index) => (
                <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                  <p>
                    <strong>Rating:</strong> {feedback.rating} ⭐
                  </p>
                  <p>
                    <strong>Comment:</strong> {feedback.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews for this vehicle yet.</p>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Order Information</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={orderData.fullName}
                onChange={(e) =>
                  setOrderData({ ...orderData, fullName: e.target.value })
                }
                required
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={orderData.email}
                onChange={(e) =>
                  setOrderData({ ...orderData, email: e.target.value })
                }
                required
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={orderData.mobile}
                onChange={(e) =>
                  setOrderData({ ...orderData, mobile: e.target.value })
                }
                required
                className="w-full border px-4 py-2 rounded"
              />
              <textarea
                placeholder="Full Address"
                value={orderData.address}
                onChange={(e) =>
                  setOrderData({ ...orderData, address: e.target.value })
                }
                required
                className="w-full border px-4 py-2 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
