document.addEventListener("DOMContentLoaded", function () {
    const statsElement = document.getElementById("stats");
    const misdirectsElement = document.getElementById("misdir");
    const goodElement = document.getElementById("good");
    const intervElement = document.getElementById("interv");

    const resetButton = document.getElementById("reset");


    // Load stored values and update UI
    chrome.storage.local.get(["visitedCount", "misdirects", "good", "interv"], function (data) {
        statsElement.textContent = data.visitedCount || 0;
        misdirectsElement.textContent = data.misdirects || 0;
        goodElement.textContent = data.good || 0;
        intervElement.textContent = data.interv || 0;
    });

    // Reset button functionality
    resetButton.addEventListener("click", function () {
        chrome.storage.local.set({ visitedCount: 0, misdirects: 0 , good: 0, interv: 0}, function () {
            statsElement.textContent = "0";
            misdirectsElement.textContent = "0";
            goodElement.textContent = "0";
            intervElement.textContent = "0";
        });
    });
});
