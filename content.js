const shoppingKeywords = ["cart", "checkout", "buy", "product", "order", "item"];  
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora"];  

// Function to create a custom Yes/No modal
function createModal(question) {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <div id="shopping-modal" style="
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 20px; border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        z-index: 10000; text-align: center;">
      <p style="font-size: 18px; margin-bottom: 20px;">${question}</p>
      <button id="yes-btn" style="padding: 10px 20px; margin-right: 10px; background: green; color: white; border: none; border-radius: 5px; cursor: pointer;">Yes</button>
      <button id="no-btn" style="padding: 10px 20px; background: red; color: white; border: none; border-radius: 5px; cursor: pointer;">No</button>
    </div>
  `;
  
  document.body.appendChild(modal);

  document.getElementById("yes-btn").addEventListener("click", () => {
    document.body.removeChild(modal); // Close modal
  });

  document.getElementById("no-btn").addEventListener("click", () => {
    alert("Wrong Answer!");
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll if they choose "No"
  });
}

// Retrieve mode from storage if using in an extension
if (typeof chrome !== "undefined" && chrome.storage) {
  chrome.storage.local.get(["shoppingMode"], (data) => {
    if (data.shoppingMode && modes[data.shoppingMode]) {
      selectedMode = data.shoppingMode;
    }
  });
}


function isShoppingSite() {
  return shoppingSites.some(site => window.location.hostname.includes(site)) ||  
         shoppingKeywords.some(keyword => window.location.href.includes(keyword));
}

function askQuestions() {
  const questions = [
    "Babe, You need to stop shopping",
    "This is actually disgusting, Get off the site",
    "You're not supposed to buy anything, so why are you here- just to leave?",
    "We have one of these already, why are you buying another one?",
    "You know you don’t need this, right?",
    "You don't have the money for this babe- stop",
    "You're going to regret this later",
    "Bitch, you better be joking",
    "Don't contribute to overconsumption- get stop buying things",
    "Do you really need this?",
    "Think about your bank account, is this worth it?",
    "Is this a necessity or a want?",
    "Can you find a better deal elsewhere?",
    "Are you sure you can't live without this?",
    "What would your future self say about this purchase?",
    "Is this the best use of your money right now?",
    "Are you buying this just because it's on sale?",
  ];

  // Pick a random question
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  createModal(randomQuestion);  

  }


if (isShoppingSite()) {
  setTimeout(askQuestions, 2000); // Delay before showing popups
  let desperation = 0;
  while (desperation < 10) {
    setTimeout(askQuestions, Math.floor(Math.random()* (300000 - 120000 + 1)) + 120000);
    desperation++;
  }

}
