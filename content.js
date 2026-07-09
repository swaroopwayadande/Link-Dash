(function() {
  const overlayId = 'url-replacer-persistent-overlay-12345';
  
  // If it already exists, clicking the extension icon again will close it (toggle)
  if (document.getElementById(overlayId)) {
    document.getElementById(overlayId).remove();
    return;
  }

  // Create the floating window
  const overlay = document.createElement('div');
  overlay.id = overlayId;
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 330px;
    background: #f8f9fa;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    z-index: 2147483647; /* Ensure it's on top of everything */
    font-family: system-ui, -apple-system, sans-serif;
    color: #333;
    padding: 16px;
    box-sizing: border-box;
    text-align: left;
  `;

  // UI HTML
  overlay.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <h2 style="font-size: 16px; margin: 0; color: #1a73e8;">URL Replacer</h2>
      <button id="url-replacer-close-btn" style="background: none; border: none; font-size: 24px; line-height: 1; cursor: pointer; color: #666; padding: 0;">&times;</button>
    </div>

    <!-- Paste section -->
    <textarea id="url-replacer-input" placeholder="Paste your text or URL here...&#10;e.g., nid.edu/..." style="width: 100%; height: 80px; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; resize: vertical; font-family: monospace; margin-bottom: 12px; font-size: 13px;"></textarea>
    
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <button id="url-replacer-convert-btn" style="flex: 1; background-color: #1a73e8; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 13px;">Convert & Copy</button>
      <button id="url-replacer-clear-btn" style="background-color: #e0e0e0; color: #333; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 13px;">Clear</button>
    </div>
    
    <div id="url-replacer-result-container" style="display: none; background: white; padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 16px;">
      <strong style="display: block; margin-bottom: 4px; font-size: 13px;">Result Copied!</strong>
      <p id="url-replacer-result-text" style="word-break: break-all; font-family: monospace; margin: 0; color: #0d652d; font-size: 13px;"></p>
    </div>

    <hr style="margin: 16px 0; border: none; border-top: 1px solid #ccc;"/>
    <h2 style="color: #ea4335; font-size: 15px; margin-top:0; margin-bottom: 12px;">Page URL Extractor</h2>
    
    <div style="margin-bottom: 12px;">
      <strong style="display: block; margin-bottom: 4px; font-size: 13px;">1. Current Link (e.g. nid.edu/...):</strong>
      <textarea id="url-replacer-raw-title" readonly style="width: 100%; height: 50px; background: #e9ecef; margin-bottom: 4px; font-size: 12px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; padding: 6px;"></textarea>
      <button id="url-replacer-copy-raw-btn" style="padding: 6px; font-size: 12px; background-color: #4b5563; color: white; border: none; border-radius: 4px; cursor: pointer;">Copy Original</button>
    </div>
    <div style="margin-bottom: 8px;">
      <strong style="display: block; margin-bottom: 4px; font-size: 13px;">2. Converted Title (-):</strong>
      <textarea id="url-replacer-converted-extracted" readonly style="width: 100%; height: 50px; background: #e9ecef; margin-bottom: 4px; font-size: 12px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; padding: 6px;"></textarea>
      <button id="url-replacer-copy-converted-btn" style="padding: 6px; font-size: 12px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">Copy Converted</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // --- Logic Setup --- //
  
  // Close Button Logic
  document.getElementById('url-replacer-close-btn').addEventListener('click', () => {
    overlay.remove();
  });

  // Paste / Convert section logic
  const inputText = document.getElementById('url-replacer-input');
  const convertBtn = document.getElementById('url-replacer-convert-btn');
  const clearBtn = document.getElementById('url-replacer-clear-btn');
  const resultContainer = document.getElementById('url-replacer-result-container');
  const resultText = document.getElementById('url-replacer-result-text');

  convertBtn.addEventListener('click', async () => {
    const text = inputText.value;
    if (!text.trim()) return;
    const convertedText = text.replace(/[\/\s]+/g, '-');
    resultText.textContent = convertedText;
    resultContainer.style.display = 'block';
    
    try {
      await navigator.clipboard.writeText(convertedText);
      const orig = convertBtn.textContent;
      convertBtn.textContent = 'Copied!';
      convertBtn.style.backgroundColor = '#0d652d';
      setTimeout(() => { convertBtn.textContent = orig; convertBtn.style.backgroundColor = '#1a73e8'; }, 2000);
    } catch (err) { }
  });

  clearBtn.addEventListener('click', () => {
    inputText.value = '';
    resultContainer.style.display = 'none';
    resultText.textContent = '';
    inputText.focus();
  });

  // Extraction logic (getting hostname and pathname)
  const rawTitle = document.getElementById('url-replacer-raw-title');
  const convertedTitleExtracted = document.getElementById('url-replacer-converted-extracted');
  const copyRawBtn = document.getElementById('url-replacer-copy-raw-btn');
  const copyConvertedBtn = document.getElementById('url-replacer-copy-converted-btn');

  const hostname = window.location.hostname.replace(/^www\./, '');
  let pathname = window.location.pathname;
  if (pathname.endsWith('/') && pathname.length > 1) {
      pathname = pathname.substring(0, pathname.length - 1);
  }
  const cleanUrl = hostname + pathname;
  
  rawTitle.value = cleanUrl;
  convertedTitleExtracted.value = cleanUrl.replace(/[\/\s]+/g, '-');

  const setupCopyBtn = (btn, inputField) => {
    btn.addEventListener('click', async () => {
      if (!inputField.value) return;
      try {
        await navigator.clipboard.writeText(inputField.value);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        const originalBg = btn.style.backgroundColor;
        btn.style.backgroundColor = '#0d652d';
        setTimeout(() => { 
          btn.textContent = originalText; 
          btn.style.backgroundColor = originalBg;
        }, 1500);
      } catch (err) {}
    });
  };

  setupCopyBtn(copyRawBtn, rawTitle);
  setupCopyBtn(copyConvertedBtn, convertedTitleExtracted);

})();
