// Zena — shared storage helper (used by content.js, popup.js, background.js)
//
// chrome.storage.sync isn't reliable in every Chromium browser: Brave
// replaces Google's sync backend, so sync calls can fail or silently store
// nothing. That left the extension with no saved settings and everything
// switched off. This helper keeps storage.local as the source of truth and
// mirrors to storage.sync when it works, and always merges in defaults.

const ZenaStorage = (() => {
  const KEY = "zenaSettings";

  const DEFAULTS = {
    hideHomeRecommendations: true,
    hideSidebarRecommendations: true,
    hideEndScreenCards: false,
    hideComments: false,
    hideShorts: false,
    hideLiveChat: false,
    disableAutoplay: false,
    hideExploreTrending: false
  };

  async function readArea(area) {
    try {
      const result = await chrome.storage[area].get(KEY);
      return result && result[KEY] ? result[KEY] : null;
    } catch (e) {
      return null;
    }
  }

  // Always resolves to a complete settings object.
  async function get() {
    const stored = (await readArea("local")) || (await readArea("sync")) || {};
    return { ...DEFAULTS, ...stored };
  }

  async function set(settings) {
    const value = { ...DEFAULTS, ...settings };
    try {
      await chrome.storage.local.set({ [KEY]: value });
    } catch (e) {
      console.warn("Zena: could not write local storage", e);
    }
    try {
      await chrome.storage.sync.set({ [KEY]: value });
    } catch (e) {
      // Sync unavailable (e.g. Brave without sync chain) — local copy is enough.
    }
    return value;
  }

  function onChange(callback) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if ((area === "local" || area === "sync") && changes[KEY]) {
        callback({ ...DEFAULTS, ...(changes[KEY].newValue || {}) });
      }
    });
  }

  return { get, set, onChange, DEFAULTS };
})();
