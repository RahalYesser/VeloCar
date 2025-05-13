export const initForum = () => {
  if (!localStorage.getItem("forumThreads")) {
    const threads = [
      {
        id: Date.now(),
        title: "Welcome to the Car Forum!",
        body: "Feel free to ask questions, share reviews, or discuss anything about cars.",
        author: "Admin",
        timestamp: new Date().toISOString(),
        replies: [
          {
            id: Date.now() + 1,
            body: "Thanks! Looking forward to sharing my car experience.",
            author: "User123",
            timestamp: new Date().toISOString()
          }
        ]
      },
      {
        id: Date.now() + 2,
        title: "Best used SUV for under $20,000?",
        body: "Any recommendations for a reliable SUV under 20k?",
        author: "AutoHunter",
        timestamp: new Date().toISOString(),
        replies: []
      }
    ];

    localStorage.setItem("forumThreads", JSON.stringify(threads));
    console.log("✅ Initialized forumThreads in localStorage.");
  }
};
