chrome.action.onClicked.addListener((tab) => {
  // Check if we are on a valid page (Chrome won't let you inject into internal chrome:// pages)
  if (tab.url && tab.url.startsWith('chrome://')) {
    console.error("Cannot inject into chrome:// pages");
    return;
  }
  
  // Inject the overlay into the current page when the icon is clicked
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
