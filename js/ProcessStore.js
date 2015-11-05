var ProcessStore = {
  saveMultiple: function(processNumbers, callback, properties) {
    var processesToBeSaved = {};
    processNumbers.forEach(function (number) {
      processesToBeSaved[number] = properties || {};
    });
    chrome.storage.local.set(processesToBeSaved, callback);
  },
  markAsViewed: function(processNumber) {
    ProcessStore.saveMultiple([processNumber], null, { isViewed: true });
  },
  getNextProcess: function(callback) {
    chrome.storage.local.get(null, function(processes) {
      var nextProcess = Object.keys(processes).filter(function(process) {
        return !processes[process].isViewed;
      })[0];
      callback(nextProcess);
    });
  },
  getAllProcesses: function(callback) {
    chrome.storage.local.get(null, function(processes) {
      callback(processes);
    });
  },
  clear: function(callback) {
    chrome.storage.local.clear(callback);
  },
  markAllNotViewed: function(callback) {
    ProcessStore.getAllProcesses(function(processes) {
      ProcessStore.saveMultiple(Object.keys(processes), callback, { isViewed: false });
    });
  }
};
