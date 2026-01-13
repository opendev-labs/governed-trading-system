// Background monitoring script
console.log("ScanTrade Monitor Installed");

chrome.runtime.onInstalled.addListener(() => {
    console.log("ScanTrade Extension Active");
});
