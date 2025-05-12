import React, { useState } from 'react';

export default function CarFilter({ onFilter }) {
  const [isNew, setIsNew] = useState(null);
  const [marque, setMarque] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [kilometrage, setKilometrage] = useState('');

  const applyFilters = () => {
    onFilter({
      isNew,
      marque,
      type,
      price: price ? parseFloat(price) : null,
      kilometrage: kilometrage ? parseInt(kilometrage) : null
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <select onChange={(e) => setIsNew(e.target.value === 'all' ? null : e.target.value === 'new')}>
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
      <input type="text" placeholder="Marque" value={marque} onChange={(e) => setMarque(e.target.value)} />
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
      <input type="number" placeholder="Max Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      {isNew === false && (
        <input type="number" placeholder="Max Kilometrage" value={kilometrage} onChange={(e) => setKilometrage(e.target.value)} />
      )}
      <button onClick={applyFilters} className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
    </div>
  );
}
