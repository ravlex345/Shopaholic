let activeTabId = null;
let startTime = null;
const shoppingSites = ["amazon", "ebay", "etsy", "aliexpress", "walmart", "bestbuy", "target", "sephora"];
let clearBadgeTimeout = null;

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

// Function to update the badge
function updateBadge(isShoppingSite) {
    if (isShoppingSite) {
        chrome.action.setBadgeText({ text: "No!" });
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // Red color for "No!"
        if (clearBadgeTimeout) {
            clearTimeout(clearBadgeTimeout);
            clearBadgeTimeout = null;
        }
    } else {
        chrome.action.setBadgeText({ text: "Yay!" });
        chrome.action.setBadgeBackgroundColor({ color: '#00FF00' }); // Green color for "Yay!"

        // Set timeout to clear badge after 1 minute
        clearBadgeTimeout = setTimeout(() => {
            chrome.action.setBadgeText({ text: "" });
        }, 10000);
    }
}

// Listen for tab updates and track visits
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        const isShoppingSite = shoppingSites.some(site => tab.url.includes(site));
        updateBadge(isShoppingSite);

        if (isShoppingSite) {
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
    chrome.tabs.get(activeTabId, (tab) => {
        if (chrome.runtime.lastError) return; // Prevent errors if the tab is gone

        const isShoppingSite = tab && tab.url && shoppingSites.some(site => tab.url.includes(site));
        updateBadge(isShoppingSite);

        if (isShoppingSite) {
            startTime = Date.now();
        } else {
            startTime = null;
        }
    });
});

// Track when tab is closed
chrome.tabs.onRemoved.addListener(() => {
    updateTimeSpent();
    chrome.action.setBadgeText({ text: "Yay!" });
});

// Track when the window loses focus
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        updateTimeSpent();
        
        // If the user leaves Chrome, set a timer to clear the badge
        
        chrome.action.setBadgeText({ text: "" });
        chrome.action.setBadgeBackgroundColor({ color: '#00FF00' })
    }
});

// Ensure badge is updated when extension starts
function initializeBadge() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            const isShoppingSite = tab && tab.url && shoppingSites.some(site => tab.url.includes(site));
            updateBadge(isShoppingSite);
        }
    });
}

chrome.runtime.onStartup.addListener(initializeBadge);
chrome.runtime.onInstalled.addListener(initializeBadge);
