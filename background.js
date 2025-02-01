let activeTabId = null;
let startTime = null;
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora"];  

// Function to update time spent
function updateTimeSpent() {
    if (activeTabId !== null && startTime !== null) {
        let elapsedTime = Math.floor((Date.now() - startTime) / 60000); // Convert to minutes
        chrome.storage.local.get(["totalTime"], (data) => {
            let totalTime = (data.totalTime || 0) + elapsedTime;
            chrome.storage.local.set({ totalTime });
        });
        startTime = null; // Reset startTime
    }
}

// Listen for tab updates and track visits
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        if (shoppingSites.some(site => tab.url.includes(site))) {
            chrome.storage.local.get(["visitedCount"], (data) => {
                let count = (data.visitedCount || 0) + 1;
                chrome.storage.local.set({ visitedCount: count });
            });

            // Start tracking time if it's a shopping site
            if (tabId === activeTabId) {
                startTime = Date.now();
            }
        }
    }
});

// Track time spent on shopping sites
chrome.tabs.onActivated.addListener(activeInfo => {
    updateTimeSpent(); // Update time spent on the previous tab
    activeTabId = activeInfo.tabId;
    startTime = Date.now();
});

// Track when tab is closed or browser is shut down
chrome.tabs.onRemoved.addListener(() => {
    updateTimeSpent();
});

// Track when the window loses focus (e.g., user switches apps)
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        updateTimeSpent();
    }
});
