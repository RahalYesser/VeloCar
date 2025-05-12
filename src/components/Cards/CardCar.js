const CardCar = ({ car }) => (
    <div className="bg-white shadow p-4 w-full max-w-xs">
      <img src={car.image} alt={car.model} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold">{car.marque} - {car.model}</h3>
      <p className="text-gray-600">{car.type}</p>
      <p className="text-blue-600 font-bold">${car.price}</p>
      {!car.isNew && <p className="text-sm text-gray-500">{car.kilometrage} km</p>}
    </div>
  );

export default CardCar;