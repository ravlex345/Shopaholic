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

async function fetchAIQuestion() {
  const url = "https://theshoppingcartofdoom.sharm226.workers.dev/questionsfromAi";

  try {
    const response = await fetch(url,{method: 'GET', mode: 'cors'}); 
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const text = await response.text();
    createModal(text);
  } catch (error) {
    console.error("Error fetching AI question:", error);
    alert('Failed to fetch AI question!');

  }
}


if (isShoppingSite()) {
  setTimeout(fetchAIQuestion, 2000); // Delay before showing popups
  let desperation = 0;
  while (desperation < 10) {
    setTimeout(() => {
      fetchAIQuestion();}, Math.floor(Math.random()* (300000 - 120000 + 1)) + 120000);    
      desperation++;
  }

}