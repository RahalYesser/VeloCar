import React, { useEffect, useState } from 'react';

export default function AdminFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Feedbacks des utilisateurs</h2>
      {feedbacks.length === 0 ? (
        <p>Aucun feedback pour le moment.</p>
      ) : (
        <ul>
          {feedbacks.map((f, index) => (
            <li key={index} className="border-b py-4">
              <p><strong>Note :</strong> {f.rating} ⭐</p>
              <p><strong>Commentaire :</strong> {f.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
