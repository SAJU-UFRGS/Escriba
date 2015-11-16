var ProcessStore = {
  create: function(processNumbers, callback, properties) {
    var props, processesToBeSaved = {};
    processNumbers.forEach(function (number, index) {
      props = properties ? JSON.parse(JSON.stringify(properties)) : {};
      processesToBeSaved[number] = props || {};
      processesToBeSaved[number].index = index;
      processesToBeSaved[number].id = number;
    });
    chrome.storage.local.set(processesToBeSaved, callback);
  },
  markAsViewed: function(processNumber) {
    var process = {};
    process[processNumber] = {isViewed: true};
    chrome.storage.local.set(process);
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
      var sortedProcesses = Object.keys(processes).sort(function (processA, processB) {
        return processes[processA].index - processes[processB].index;
      }).map(function(processNumber) {
        return processes[processNumber];
      });

      callback(sortedProcesses);
    });
  },
  clear: function(callback) {
    chrome.storage.local.clear(callback);
  },
  markAllNotViewed: function(callback) {
    chrome.storage.local.get(null, function(processes) {
      Object.keys(processes).forEach(function (processNumber) {
        processes[processNumber].isViewed = false;
      });

      chrome.storage.local.set(processes, callback);
    });
  }
};
