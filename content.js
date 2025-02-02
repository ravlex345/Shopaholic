const shoppingKeywords = ["cart", "checkout", "buy", "product", "order", "item"];  
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora"];  
const goodWebsites = ["https://apod.nasa.gov/apod/astropix.html", "https://www.nationalgeographic.com", "https://asoftmurmur.com", "https://www.boredpanda.com", "https://theuselessweb.com"];  
const badWebsites = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.moneyfit.org/financial-security/", "https://kpcu.com/Resources/Educational-Articles/Retirement/Financial-Security-What-it-Is-and-How-to-Get-There", "https://youtu.be/a-vmZpnpze0?si=6SBmbSZP2CKCErog", "https://youtu.be/yvHYWD29ZNY?si=Ae0M4AMkdf9RAGmh", "https://youtu.be/nLPZzUp3Ues?si=JbnkA8MgTjGfq-Vm"];

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
  const modalTimeout = setTimeout(() => {document.body.removeChild(modal);}, 120000);

  document.getElementById("yes-btn").addEventListener("click", () => {
    clearTimeout(modalTimeout);
    if (Math.random() < 0.8) {
      alert("Correct Answer!, Here's a treat");
      const randomGoodWebsite = goodWebsites[Math.floor(Math.random() * goodWebsites.length)];
      window.location.href = randomGoodWebsite;
    } else {
      alert("Correct Answer!");
    }
    document.body.removeChild(modal);
  });

  document.getElementById("no-btn").addEventListener("click", () => {
    clearTimeout(modalTimeout);
    if (Math.random() < 0.8) {
      alert("Wrong Answer! Here comes your doom");
      const randomBadWebsite = badWebsites[Math.floor(Math.random() * badWebsites.length)];
      window.location.href = randomBadWebsite;
      
      // 🔹 Ensure `misdirects` is updated safely
      chrome.storage.local.get(["misdirects"], (data) => {
        let misdirects = (data.misdirects || 0) + 1;
        chrome.storage.local.set({ misdirects }, () => {
          console.log(`Misdirect count updated: ${misdirects}`);
        });
      });

    } else {
      alert("Wrong Answer!");
    }
    document.body.removeChild(modal);
  });
}

function isShoppingSite() {
  return shoppingSites.some(site => window.location.hostname.includes(site)) ||  
         shoppingKeywords.some(keyword => window.location.href.includes(keyword));
}

async function fetchAIQuestion() {
  const url = "https://theshoppingcartofdoom.sharm226.workers.dev/questionsfromAi";

  try {
    const response = await fetch(url, { method: 'GET', mode: 'cors' }); 
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const text = await response.text();
    createModal(text);
  } catch (error) {
    console.error("Error fetching AI question:", error);
  }
}

if (isShoppingSite()) {
  setTimeout(fetchAIQuestion, 2000); // Delay before showing popups

  // 🔹 Use `setInterval` instead of multiple `setTimeout` calls
  setInterval(() => {
    fetchAIQuestion();
  }, Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000);  
}
