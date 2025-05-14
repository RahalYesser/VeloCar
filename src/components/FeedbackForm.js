import React, { useState } from "react";

export default function FeedbackForm({ carId }) {
  const [formData, setFormData] = useState({ rating: "", comment: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const newFeedback = { ...formData, carId, timestamp: new Date().toISOString() };
    localStorage.setItem("feedbacks", JSON.stringify([newFeedback, ...storedFeedbacks]));
    alert("Thank you for your feedback!");
    setFormData({ rating: "", comment: "" });
  };

  return (
    <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t px-4 py-3 border-b border-gray-200 bg-gray-100">
        <h2 className="text-xl font-semibold text-blueGray-700">
          Submit Your Feedback
        </h2>
      </div>

      <div className="p-4 bg-white border-b border-gray-100">
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-2 rounded border border-gray-300 text-sm"
        >
          <option value="">Rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>

        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Your comment"
          required
          className="w-full px-3 py-2 mb-2 rounded border border-gray-300 text-sm"
          rows={3}
        />

        <button
          onClick={handleSubmit}
          className="bg-gray-800 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
