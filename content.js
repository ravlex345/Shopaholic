const shoppingKeywords = ["cart", "checkout", "buy", "product", "order", "item"];  
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora","temu"];  
const goodWebsites = ["https://apod.nasa.gov/apod/astropix.html", "https://www.nationalgeographic.com", "https://asoftmurmur.com", "https://www.boredpanda.com", "https://theuselessweb.com"];  
const badWebsites = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.moneyfit.org/financial-security/", "https://kpcu.com/Resources/Educational-Articles/Retirement/Financial-Security-What-it-Is-and-How-to-Get-There", "https://www.investopedia.com/terms/f/financialsecurity.asp", "https://youtu.be/a-vmZpnpze0?si=6SBmbSZP2CKCErog", "https://youtu.be/yvHYWD29ZNY?si=Ae0M4AMkdf9RAGmh", "https://youtu.be/nLPZzUp3Ues?si=JbnkA8MgTjGfq-Vm"]
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
    
    if (Math.random() < 0.8) { // 80% chance
      alert("Correct Answer!, Here's a treat");
      const randomGoodWebsite = goodWebsites[Math.floor(Math.random() * goodWebsites.length)];
      window.location.href = randomGoodWebsite;
    }
    alert("Correct Answer!");
    document.body.removeChild(modal); // Close modal
  });

  document.getElementById("no-btn").addEventListener("click", () => {
    
    if (Math.random() < 0.8) { // 80% chance
      alert("Wrong Answer! Here's comes your doom");
      const randomBadWebsite = badWebsites[Math.floor(Math.random() * badWebsites.length)];
      window.location.href = randomBadWebsite;
    } 
    alert("Wrong Answer!");
    document.body.removeChild(modal);
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
    "You know you don't need this, right?",
    "You don't have the money for this babe- stop",
    "You're going to regret this later",
    "Bitch, you better be joking",
    "Don't contribute to overconsumption- stop buying things",
    "Do you really need this?",
    "Think about your bank account? Don't you want to save her?",
    "Is this a necessity or a want?",
    "Are you sure you can't live without this? I think the planet can",
    "What would your future self say about this purchase? Don't you want to make them proud?",
    "This is not the best use of your money right now. Save it instead",
];


  // Pick a random question
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  createModal(randomQuestion);  

  }


if (isShoppingSite()) {
  setTimeout(askQuestions, 2000); // Delay before showing popups
  let desperation = 0;
  while (desperation < 20) {
    setTimeout(askQuestions, Math.floor(Math.random()* (300000 - 120000 + 1)) + 120000);
    desperation++;
  }

}
