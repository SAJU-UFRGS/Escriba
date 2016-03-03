var DocUploader = {
  loadProcesses: function (successCallback) {
    var value, processesList;
    value = Popup.getValueFromInput();
    processesList = Parser.parseToListOfProcesses(value);

    DocUploader.store(processesList);
    successCallback();
  },

  store: function (processesList) {
    ProcessStore.clear();
    ProcessStore.create(processesList, Popup.updateView);
  }
};
