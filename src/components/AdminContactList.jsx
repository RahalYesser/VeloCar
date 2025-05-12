import React, { useEffect, useState } from 'react';

export default function AdminContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Messages reçus</h2>
      {contacts.length === 0 ? (
        <p>Aucun message pour le moment.</p>
      ) : (
        <ul>
          {contacts.map((contact, index) => (
            <li key={index} className="border-b py-4">
              <p><strong>Nom :</strong> {contact.name}</p>
              <p><strong>Email :</strong> {contact.email}</p>
              <p><strong>Message :</strong> {contact.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
