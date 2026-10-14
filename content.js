// Zena — content script
// Applies the user's toggles by setting data-attributes on <html>, which
// content.css turns into hide rules. Also handles the one setting that
// CSS can't do alone: turning off YouTube's built-in Autoplay switch.

(() => {
  const ATTR_MAP = {
    hideHomeRecommendations: "data-zena-home",
    hideSidebarRecommendations: "data-zena-sidebar",
    hideEndScreenCards: "data-zena-endscreen",
    hideComments: "data-zena-comments",
    hideShorts: "data-zena-shorts",
    hideLiveChat: "data-zena-livechat",
    hideExploreTrending: "data-zena-explore"
  };

  let currentSettings = null;

  function applyAttributes(settings) {
    const html = document.documentElement;
    for (const [key, attr] of Object.entries(ATTR_MAP)) {
      html.setAttribute(attr, settings[key] ? "on" : "off");
    }
  }

  function tryDisableAutoplay() {
    if (!currentSettings || !currentSettings.disableAutoplay) return;
    const toggle = document.querySelector(
      ".ytp-autonav-toggle-button, button.ytp-button[data-tooltip-target-id='ytp-autonav-toggle-button']"
    );
    if (!toggle) return;
    const isOn = toggle.getAttribute("aria-checked") === "true";
    if (isOn) toggle.click();
  }

  function loadAndApply() {
    chrome.storage.sync.get("zenaSettings", (result) => {
      currentSettings = result.zenaSettings || {};
      applyAttributes(currentSettings);
      tryDisableAutoplay();
    });
  }

  // Initial load
  loadAndApply();

  // React to toggles changed from the popup while this tab stays open
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.zenaSettings) {
      currentSettings = changes.zenaSettings.newValue || {};
      applyAttributes(currentSettings);
      tryDisableAutoplay();
    }
  });

  // YouTube is a single-page app: re-apply after in-app navigation and
  // keep watching for the autoplay control, which loads asynchronously.
  document.addEventListener("yt-navigate-finish", () => {
    if (currentSettings) applyAttributes(currentSettings);
    tryDisableAutoplay();
  });

  const observer = new MutationObserver(() => tryDisableAutoplay());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
