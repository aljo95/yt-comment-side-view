chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            if ((changeInfo.url) && ((changeInfo.url).substring(0, 30) === "https://www.youtube.com/watch?")) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "placeholder", url: changeInfo.url}); 
            } 
        });
    }
);