import carBrands from "./carBrands"; // your list of brands with logos

export const initCarCategories = () => {
  if (!localStorage.getItem("carCategories")) {
    const categories = {
      marques: carBrands.map((b) => b.name),
      models: {
        "Alfa Romeo": ["Giulia", "Stelvio"],
        Audi: ["A3","A4", "Q5", "A6"],
        "Mercedes Benz": ["C-Class", "E-Class"],
        BMW: ["Series 3", "Series 5"],
        BYD: ["Atto 3", "Dolphin"],
        Chevrolet: ["Malibu", "Camaro"],
        Fiat: ["500", "Panda"],
        Ford: ["Focus", "Explorer"],
        Honda: ["Civic", "CR-V"],
        Jeep: ["Wrangler", "Cherokee"],
        "Land ROver": ["Range Rover", "Discovery"],
        "Aston Martin": ["DB11", "Vantage"]
      },
      types: [
        "City Car",
        "Compact",
        "Sedan",
        "SUV",
        "Coupe",
        "Minivan",
        "Utility",
        "Pick Up",
        "Cabriolet"
      ]
    };

    localStorage.setItem("carCategories", JSON.stringify(categories));
    console.log("✅ Initialized carCategories in localStorage.");
  }
};
