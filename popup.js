document.addEventListener("DOMContentLoaded", function () {
    const statsElement = document.getElementById("stats");
    const misdirectsElement = document.getElementById("misdir");
    const resetButton = document.getElementById("reset");

    // Load stored values and update UI
    chrome.storage.local.get(["visitedCount", "misdirects"], function (data) {
        statsElement.textContent = data.visitedCount || 0;
        misdirectsElement.textContent = data.misdirects || 0;
    });

    // Reset button functionality
    resetButton.addEventListener("click", function () {
        chrome.storage.local.set({ visitedCount: 0, misdirects: 0 }, function () {
            statsElement.textContent = "0";
            misdirectsElement.textContent = "0";
        });
    });
});
