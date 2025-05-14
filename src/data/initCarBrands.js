import carBrands from "./carBrands"; // your list of brands with logos

export const initCarBrands = () => {
  if (!localStorage.getItem("carBrands")) {
    localStorage.setItem("carBrands", JSON.stringify(carBrands));
    console.log("✅ Initialized carBrands in localStorage.");
  }
};
