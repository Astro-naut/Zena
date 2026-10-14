// Zena — background service worker
// Sets sensible defaults the first time the extension is installed, and
// keeps the icon behavior simple: all logic lives in content.js + popup.js.

const DEFAULT_SETTINGS = {
  hideHomeRecommendations: true,
  hideSidebarRecommendations: true,
  hideEndScreenCards: false,
  hideComments: false,
  hideShorts: false,
  hideLiveChat: false,
  disableAutoplay: false,
  hideExploreTrending: false
};

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await chrome.storage.sync.set({ zenaSettings: DEFAULT_SETTINGS });
  } else if (details.reason === "update") {
    // Backfill any new toggles added in later versions without
    // overwriting settings the user already chose.
    const stored = await chrome.storage.sync.get("zenaSettings");
    const merged = { ...DEFAULT_SETTINGS, ...(stored.zenaSettings || {}) };
    await chrome.storage.sync.set({ zenaSettings: merged });
  }
});
