
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            let hasBeenRun = false
            chrome.runtime.onMessage.addListener(
                function(req) {
                    if (req.msg === "init")
                        hasBeenRun = true    
                }
            )
            if ((changeInfo.url) && ((changeInfo.url).substring(0, 30) === "https://www.youtube.com/watch?") && (!hasBeenRun)) {
                chrome.scripting.executeScript({target: {tabId: tabId}, files: ['scripts/content.js']});
            } 
        });
    } 
);
