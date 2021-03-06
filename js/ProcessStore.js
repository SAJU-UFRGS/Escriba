var ProcessStore = {
  create: function(processNumbers, callback, properties) {
    var props, number, processesToBeSaved = {};
    processNumbers.forEach(function (process, index) {
      number = process.number;
      props = properties ? JSON.parse(JSON.stringify(properties)) : {};
      processesToBeSaved[number] = props || {};
      processesToBeSaved[number].index = index;
      processesToBeSaved[number].number = number;
      processesToBeSaved[number].displayNumber = process.displayNumber;
    });
    chrome.storage.local.set(processesToBeSaved, callback);
  },
  updateProcess: function (number, data) {
    var process;
    chrome.storage.local.get(number, function(processesList) {
      process = processesList[number];
      Object.keys(data).forEach(function (property) {
        process[property] = data[property];
      });
      chrome.storage.local.set(processesList);
    });
  },
  getNextProcess: function(callback) {
    var nextProcess = ProcessStore.getAllProcesses(function (processes) {
      var unseenProcesses = processes.filter(function(process) { return !process.isViewed; });
      callback(unseenProcesses[0]);
    });
  },
  getUpdatedProcesses: function (callback) {
    ProcessStore.getAllProcesses(function (processes) {
      var updatedProcesses = processes.filter(function(process) {
        return (process.updates && process.updates.length > 0);
      });

      callback(updatedProcesses);
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
        processes[processNumber].updates = null;
      });

      chrome.storage.local.set(processes, callback);
    });
  }
};
