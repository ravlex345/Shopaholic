
document.addEventListener("DOMContentLoaded", function () {
    const statsElement = document.getElementById("stats");
    const timeElement = document.getElementById("time");
    const misdirectsElement = document.getElementById("misdir");

    const resetButton = document.getElementById("reset");

    // Load stored values and update UI
    chrome.storage.local.get(["visitedCount", "totalTime", "misdirects"], function (data) {
        statsElement.textContent = data.visitedCount || 0;
        //timeElement.textContent = (data.totalTime || 0) + " min";
        misdirectsElement.textContent = data.misdirects || 0;
    });

    // Reset button functionality
    resetButton.addEventListener("click", function () {
        chrome.storage.local.set({ visitedCount: 0, totalTime: 0 }, function () {
            statsElement.textContent = "0";
            //timeElement.textContent = "0 min";
            misdirectsElement.textContent = "0";
        });
    });
});
