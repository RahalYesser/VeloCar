const CardCarBrands = ({ name, image }) => (
  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 p-4">
    <div className="px-6">
      <img
        alt={name}
        src={image}
        className="shadow-lg rounded-full p-6"
      />
      <div className="pt-6 text-center">
        <h5 className="text-xl font-bold">{name}</h5>
      </div>
    </div>
  </div>
);

export default CardCarBrands;
