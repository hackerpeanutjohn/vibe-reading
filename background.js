'use strict';

const MENU_ID = 'translate-pdf-fulltext';

// URLs where the right-click item should appear. arxiv serves PDFs at /pdf/<id>
// with no .pdf extension, so it needs its own pattern.
const PDF_PATTERNS = [
  '*://*/*.pdf',
  '*://*/*.pdf?*',
  '*://*/*.PDF',
  '*://arxiv.org/pdf/*',
  '*://*/pdf/*',
  'file:///*.pdf',
  'file:///*.PDF',
];

// ─── Open the two-pane translation viewer for a given tab ──────────────────────
async function openViewer(tab) {
  let viewer = chrome.runtime.getURL('viewer.html');
  if (tab?.url && isPdf(tab.url)) {
    viewer += '?file=' + encodeURIComponent(tab.url);
  }
  await chrome.tabs.create({ url: viewer });
}

function isPdf(url) {
  try {
    const path = new URL(url).pathname;
    return /\.pdf(\?.*)?$/i.test(path) || /\/pdf\/[^/]+$/i.test(path);
  } catch {
    return false;
  }
}

// ─── Context menu (right-click) ────────────────────────────────────────────────
function setupMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: '用此插件翻譯整份 PDF（全頁翻譯）',
      contexts: ['page', 'selection', 'action'],
      documentUrlPatterns: PDF_PATTERNS,
    });
  });
}

chrome.runtime.onInstalled.addListener(setupMenu);
chrome.runtime.onStartup.addListener(setupMenu);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ID) openViewer(tab);
});

// ─── Toolbar icon click ─────────────────────────────────────────────────────────
chrome.action.onClicked.addListener(openViewer);
