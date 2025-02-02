const shoppingKeywords = ["cart", "checkout", "buy", "product", "order", "item"];  
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora"];  
const goodWebsites = ["https://apod.nasa.gov/apod/astropix.html", "https://www.nationalgeographic.com", "https://asoftmurmur.com", "https://www.boredpanda.com", "https://theuselessweb.com"];  
const badWebsites = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.moneyfit.org/financial-security/", "https://kpcu.com/Resources/Educational-Articles/Retirement/Financial-Security-What-it-Is-and-How-to-Get-There", "https://youtu.be/a-vmZpnpze0?si=6SBmbSZP2CKCErog", "https://youtu.be/yvHYWD29ZNY?si=Ae0M4AMkdf9RAGmh", "https://youtu.be/nLPZzUp3Ues?si=JbnkA8MgTjGfq-Vm"];

function createModal(question) {
  const modal = document.createElement("div");
  modal.id = "shopping-modal";
  modal.innerHTML = `
    #shopping-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      text-align: center;
      width: 280px;
      max-width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background:rgb(212, 230, 247);
    }
    #modal-logo {
      width: 60px; 
      height: 60px; 
      margin-bottom: 12px;
    }
    h2 {
      font-size: 18px;
      color: #333;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #555;
      margin-bottom: 15px;
      background: #f8f9fa;
      border-radius: 6px;
    }
    #button-container {
      display: flex;
      gap: 12px;
    }
    #yes-btn, #no-btn {
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s ease;
    }
    #yes-btn {
      background: #28a745;
      color: white;
      border: none;
    }
    #no-btn {
      background: #dc3545;
      color: white;
      border: none;
    }
  `;
  modal.innerHTML = `
    <style>${modal.innerHTML}</style>
    <div id="shopping-modal">
      <img id="modal-logo" alt="Shopping Cart of Doom Logo">
      <h2>Shopping Cart of Doom</h2>
      <p>${question}</p>
      <div id="button-container">
        <button id="yes-btn">Yes</button>
        <button id="no-btn">No</button>
      </div>
    </div>
  `;

  
  document.body.appendChild(modal);
  document.getElementById("modal-logo").src = chrome.runtime.getURL("Logo.png");

  chrome.storage.local.get(["interv"], (data) => {
    let interv = (data.interv || 0) + 1;
    chrome.storage.local.set({ interv }, () => {
      console.log(`interv count updated: ${interv}`);
    });
  });
  const modalTimeout = setTimeout(() => {document.body.removeChild(modal);}, 120000);

  document.getElementById("yes-btn").addEventListener("click", () => {
    clearTimeout(modalTimeout);
    chrome.storage.local.get(["good"], (data) => {
      let good = (data.good || 0) + 1;
      chrome.storage.local.set({ good }, () => {
        console.log(`Good count updated: ${good}`);
      });

    });
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
      
      // Ensure `misdirects` is updated safely
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

  setInterval(() => {
    fetchAIQuestion();
  }, Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000);  
}
