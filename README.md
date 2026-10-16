# Zena - Focus and Productivity Extension for Youtube

Zena strips YouTube's distractions the way Unhook does, with one difference:
every hide-rule is its own switch, off by default except the two you asked
for by name (homepage recommendations, sidebar recommendations). Turn any
of the others on from the popup whenever you want them.

## Install (Chrome, Edge, Opera — any Chromium browser)

1. Unzip this folder somewhere permanent (don't delete it after installing).
2. Open `chrome://extensions` (or `edge://extensions`, `opera://extensions`).
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the unzipped `zena-extension` folder.
5. Pin Zena from the puzzle-piece menu so its icon stays visible.

## Install (Brave)

1. Unzip this folder somewhere permanent (don't delete it after installing).
2. Open `brave://extensions` in the address bar.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the unzipped `zena-extension` folder.
   Make sure the folder you pick is the one that contains `manifest.json`
   and the `icons` folder.
5. Click the puzzle-piece (Extensions) button in the toolbar and pin Zena so
   its icon stays visible.
6. Open YouTube and click the Zena icon to choose your toggles.

If Brave says "Could not load icon", check that the files in `icons/` are
named exactly `icon16.png`, `icon48.png` and `icon128.png`.

## Install (Firefox 109+)

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and select `manifest.json` inside the
   unzipped folder.
   (Temporary add-ons are removed when Firefox closes; for a permanent
   install, Firefox requires the extension to be signed by Mozilla first.)

## Using it

Click the Zena icon on any YouTube tab to open the toggle list:

- **Recommendations** — homepage feed, sidebar "Up next", end-screen cards.
- **Other distractions** — Shorts, comments, live chat, Explore/Trending
  in the left guide, and YouTube's own Autoplay switch.

Every toggle takes effect immediately, on open tabs included — no reload
needed for most; if the sidebar or feed doesn't disappear right away,
YouTube's own page transition needs a second to catch up.