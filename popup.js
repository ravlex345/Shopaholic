// List of shopping websites to track
const shoppingSites = ["amazon", "ebay", "walmart", "flipkart", "aliexpress", "bestbuy"];

document.addEventListener("DOMContentLoaded", function () {
    const statsElement = document.getElementById("stats");
    const timeElement = document.getElementById("time");
    const resetButton = document.getElementById("reset");

    // Load stored values
    chrome.storage.local.get(["visitedCount", "totalTime"], function (data) {
        statsElement.textContent = data.visitedCount;
        timeElement.textContent = (data.totalTime) + " min";
    });

    // Reset button functionality
    resetButton.addEventListener("click", function () {
        chrome.storage.local.set({ visitedCount: 0, totalTime: 0 }, function () {
            statsElement.textContent = "0";
            timeElement.textContent = "0 min";
        });
    });
});
