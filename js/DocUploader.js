var DocUploader = {
  loadProcesses: function () {
    var value, processesList;
    value = Popup.getValueFromInput();
    processesList = Parser.parseToListOfProcesses(value);

    DocUploader.store(processesList);
  },

  store: function (processesList) {
    ProcessStore.clear();
    ProcessStore.create(processesList, Popup.updateView);
  }
};
