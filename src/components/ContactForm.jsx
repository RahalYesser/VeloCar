import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    localStorage.setItem('contacts', JSON.stringify([formData, ...storedContacts]));
    alert('Message envoyé !');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Votre nom"
        required
        className="w-full p-2 border mb-4 rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Votre email"
        required
        className="w-full p-2 border mb-4 rounded"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Votre message"
        required
        className="w-full p-2 border mb-4 rounded"
        rows="4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Envoyer
      </button>
    </form>
  );
}
