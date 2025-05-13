// initData.js
import { saveCars } from './storage';

const cars = [
  {
    id: "1",
    isNew: true,
    marque: "Audi",
    model: "A3",
    type: "Sedan",
    price: 22000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: "2",
    isNew: false,
    marque: "Honda",
    model: "Civic",
    type: "Sedan",
    price: 15000,
    kilometrage: 80000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: "3",
    isNew: true,
    marque: "BMW",
    model: "X7",
    type: "Electric",
    price: 35000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: "4",
    isNew: false,
    marque: "Ford",
    model: "Focus",
    type: "Hatchback",
    price: 10000,
    kilometrage: 120000,
    image: "https://via.placeholder.com/200"
  }
];

saveCars(cars);
