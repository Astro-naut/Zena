// Zena — popup logic
// Every checkbox id matches a settings key exactly, so we can loop
// instead of wiring each control by hand.

const TOGGLE_IDS = [
  "hideHomeRecommendations",
  "hideSidebarRecommendations",
  "hideEndScreenCards",
  "hideShorts",
  "hideComments",
  "hideLiveChat",
  "hideExploreTrending",
  "disableAutoplay"
];

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

const statusEl = document.getElementById("status");

function loadSettings() {
  chrome.storage.sync.get("zenaSettings", (result) => {
    const settings = { ...DEFAULT_SETTINGS, ...(result.zenaSettings || {}) };
    for (const id of TOGGLE_IDS) {
      document.getElementById(id).checked = Boolean(settings[id]);
    }
  });
}

function saveSetting(id, value) {
  chrome.storage.sync.get("zenaSettings", (result) => {
    const settings = { ...DEFAULT_SETTINGS, ...(result.zenaSettings || {}) };
    settings[id] = value;
    chrome.storage.sync.set({ zenaSettings: settings }, () => {
      statusEl.textContent = "Saved";
      setTimeout(() => (statusEl.textContent = "Changes apply instantly"), 900);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  for (const id of TOGGLE_IDS) {
    document.getElementById(id).addEventListener("change", (e) => {
      saveSetting(id, e.target.checked);
    });
  }
});
