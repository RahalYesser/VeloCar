// storage.js
export const saveCars = (cars) => {
  localStorage.setItem("cars", JSON.stringify(cars));
};

export const getCars = () => {
  const data = localStorage.getItem("cars");
  return data ? JSON.parse(data) : [];
};
