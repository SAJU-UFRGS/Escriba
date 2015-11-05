var DocUploader = {
  loadProcesses: function () {
    var value, processesList;
    value = Popup.getValueFromInput();
    processesList = Parser.parseToListOfProcesses(value);

    DocUploader.store(processesList);
  },

  store: function (processesList) {
    ProcessStore.clear();
    ProcessStore.saveMultiple(processesList, Popup.updateView);
  }
};
