// types.ts or models.ts
export interface Car {
  id: string;
  isNew: boolean; // true for new, false for used
  marque: string;
  model: string;
  type: string; // e.g., SUV, Sedan
  price: number;
  kilometrage?: number; // Only for used cars
  image: string;
}
