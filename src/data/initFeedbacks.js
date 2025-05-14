export const initFeedbacks = () => {
  if (!localStorage.getItem("feedbacks")) {
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    
    // Declare and initialize feedbacks before logging
    const feedbacks = storedCars.slice(0, 10).map((car, index) => ({
      carId: car.id,
      rating: 5,
      comment: `Great car! I love the ${car.marque} ${car.model}. It's a wonderful experience driving it.`,
      timestamp: new Date().toISOString(),
    }));
    
    // Log feedbacks after initialization
    console.log("init:", feedbacks);

    // Store the feedbacks in localStorage
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    console.log("✅ Initialized feedbacks in localStorage.");
  }
};
