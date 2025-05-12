import { v4 as uuidv4 } from "uuid";
import audiA3 from '../assets/img/cars/car_audi_a4.png'; // Adjust path according to your folder structure
import bmwX5 from '../assets/img/cars/car_bmw_x5.png';
import fordFocus from '../assets/img/cars/car_ford_focus.png';
import fiat500 from '../assets/img/cars/car_fiat_500.png';
export const initCars = () => {
  if (!localStorage.getItem("cars")) {
    const sampleCars = [
      {
        id: uuidv4(),
        isNew: true,
        marque: "Audi",
        model: "A3",
        type: "Sedan",
        price: 80000,
        image: audiA3
      },
      {
        id: uuidv4(),
        isNew: true,
        marque: "BMW",
        model: "X5",
        type: "Sedan",
        price: 95000,
        image: bmwX5
      },
      {
        id: uuidv4(),
        isNew: false,
        marque: "Ford",
        model: "Focus",
        type: "Compact",
        price: 30000,
        kilometrage: 80000,
        image: fordFocus
      },
      {
        id: uuidv4(),
        isNew: false,
        marque: "Fiat",
        model: "500",
        type: "City Car",
        price: 20000,
        kilometrage: 60000,
        image: fiat500
      }
    ];

    localStorage.setItem("cars", JSON.stringify(sampleCars));
    console.log("✅ Initialized cars in localStorage.");
  }
};
