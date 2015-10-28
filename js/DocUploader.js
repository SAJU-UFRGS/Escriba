var DocUploader = {
  loadProcesses: function () {
    var value = Popup.getValueFromInput();
    var processesList = Parser.parseToListOfProcesses(value);
    DocUploader.store(processesList);
  },

  store: function (processesList) {
    ProcessStore.clear();
    ProcessStore.saveMultiple(processesList, Popup.updateView);
  }
}
