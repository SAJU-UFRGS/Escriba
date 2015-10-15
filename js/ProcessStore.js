var ProcessStore = {
  save: function(processNumber, optionals) {
    var processToBeSaved = {};
    processToBeSaved[processNumber] = optionals || {};
    chrome.storage.local.set(processToBeSaved);
  },
  updateViewStatus: function(processNumber) {
    ProcessStore.save(processNumber, { isViewed: true });
  },
  getNextProcess: function(callback) {
    chrome.storage.local.get(null, function(processes) {
      var nextProcess = Object.keys(processes).filter(function(process) {
        return !processes[process].isViewed;
      })[0];
      callback(nextProcess);
    });
  }
}
