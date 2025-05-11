import React, { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ rating: '', comment: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    localStorage.setItem('feedbacks', JSON.stringify([formData, ...storedFeedbacks]));
    alert('Merci pour votre feedback !');
    setFormData({ rating: '', comment: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Donnez votre avis</h2>
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4 rounded"
      >
        <option value="">Note</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} ⭐</option>
        ))}
      </select>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Votre commentaire"
        required
        className="w-full p-2 border mb-4 rounded"
        rows="4"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Envoyer
      </button>
    </form>
  );
}
