# LinkDash

A lightweight Chrome Extension that helps you quickly convert URLs or text by replacing `/` (slashes) and spaces with `-` (hyphens). It also extracts the current webpage's URL path and lets you copy both the original and converted versions with a single click.

---

## Features

### URL/Text Converter
- Paste any URL or text.
- Converts:
  - `/` → `-`
  - Spaces → `-`
- Automatically copies the converted result to your clipboard.
- One-click clear button.

### Page URL Extractor
Extracts the current webpage's URL in two formats:

**Original**
```
example.com/folder/page
```

**Converted**
```
example.com-folder-page
```

Both can be copied individually with one click.

### Floating Overlay
- Opens as a clean floating popup on the current webpage.
- Toggle by clicking the extension icon.
- Close using the × button.

---

## Example

### Input

```
https://example.com/jobs/software-engineer
```

### Output

```
https:--example.com-jobs-software-engineer
```

---

### Current Page

If you're visiting

```
https://developer.chrome.com/docs/extensions
```

The extension extracts:

Original

```
developer.chrome.com/docs/extensions
```

Converted

```
developer.chrome.com-docs-extensions
```

---

## Installation

### Developer Mode

1. Download or clone this repository.

```
git clone https://github.com/yourusername/linkdash.git
```

2. Open Chrome.

3. Navigate to

```
chrome://extensions
```

4. Enable **Developer Mode**.

5. Click **Load unpacked**.

6. Select the project folder.

7. The extension is ready to use.

---

## Project Structure

```
LinkDash/
│
├── manifest.json        # Extension configuration
├── background.js        # Injects the content script
├── content.js           # Creates the floating UI and handles logic
└── README.md
```

---

## Permissions

The extension requires:

| Permission | Purpose |
|------------|---------|
| activeTab | Access the currently active tab |
| scripting | Inject the content script into webpages |

---

## How It Works

1. Click the extension icon.
2. The content script is injected into the active webpage.
3. A floating overlay appears.
4. You can:
   - Convert pasted text.
   - Copy converted text.
   - Extract the current page URL.
   - Copy either the original or converted version.

---

## Current Version

**Version:** 1.4

---

## Browser Support

- Google Chrome
- Microsoft Edge (Chromium)
- Brave
- Opera
- Most Chromium-based browsers

---

## Limitations

- Does not work on:
  - `chrome://` pages
  - Chrome Web Store pages
  - Other protected browser pages

- Requires permission to inject scripts into webpages.

---

## Future Improvements

- Dark mode
- Keyboard shortcuts
- Automatic conversion while typing
- Copy notifications
- Custom replacement characters
- Export history
- Regex-based replacements
- Firefox support

---

## License

MIT License

---

## Author

Developed by **Swaroop Wayadande**.

If you find this project useful, consider giving it a ⭐ on GitHub.
