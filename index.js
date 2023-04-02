const allowedTLDs = [
    "edu",
    "gov",
    "org",
    "education",
    "com"
];

const blockedKeywords = [
    "games",
    "proxy",
    "sex",
    "kill",
    "blood",
    "porn"
]

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    const currentUrl = new URL(tab.url);
    const currentTLD = currentUrl.hostname.split('.').pop();
    if (!allowedTLDs.includes(currentTLD) && currentUrl.href !== chrome.runtime.getURL("blocked.html")) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
    } else {
        for (var i = 0; i < blockedKeywords.length; i++) {
            var keyword = blockedKeywords[i];
            console.log(keyword + " " + currentUrl + " " + currentUrl.hostname);
            if (currentUrl.hostname.includes(keyword)) {
                chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
            }
        }
    }
});