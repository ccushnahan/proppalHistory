`Small extension to print out info about the properties history on property pal.`

browser.browserAction.onClicked.addListener(tab => {
      browser.tabs.executeScript({
        file: "proppalHistory.js",
      });
});
