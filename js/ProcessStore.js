var ProcessStore = {
  save: function(processNumber) {
    var processToBeSaved = {};
    processToBeSaved[processNumber] = {};
    chrome.storage.local.set(processToBeSaved);
  },
  updateViewStatus: function(processNumber) {
    var processToBeSaved = {};
    processToBeSaved[processNumber] = { isViewed: true };
    chrome.storage.local.set(processToBeSaved);
  },
  getNextProcess: function(callback) {
    chrome.storage.local.get(null, function(processNumbers) {
      var nextProcess = Object.keys(processNumbers)[0];
      callback(nextProcess);
      console.log(processNumbers);
    });
  }
}
