const shoppingKeywords = ["cart", "checkout", "buy", "product", "order", "item"];  
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora"];  

function isShoppingSite() {
  return shoppingSites.some(site => window.location.hostname.includes(site)) ||  
         shoppingKeywords.some(keyword => window.location.href.includes(keyword));
}

function askQuestions() {
  const questions = [
    "Do you really need this item?",
    "Have you checked if you already own something similar?",
    "Will this still be useful in 6 months?",
    "Are you buying this because you need it, or because you’re bored?",
    "Would you rather spend this money on something more meaningful?"
  ];

//   for (const question of questions) {
//     if (!confirm(question)) {
//       alert("Take a moment to reconsider!");
//     }
//   }

  alert("Alright, proceed—but spend wisely!");
}


if (isShoppingSite()) {
  setTimeout(askQuestions, 2000); // Delay before showing popups
}
