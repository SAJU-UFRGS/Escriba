document.addEventListener('DOMContentLoaded', function() {
  Popup.setUp();
  Popup.updateView();
});

var Popup = {
  setUp: function () {
    var registerButton = document.getElementById('register');
    registerButton.addEventListener('click', DocUploader.loadProcesses);

    var restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', Popup.clearAllProcessesStatus);

    var clearButton = document.getElementById('new');
    clearButton.addEventListener('click', Popup.newList);
  },

  updateView: function () {
    ProcessStore.getAllProcesses(function (processes) {
      var processesList = Object.keys(processes).map(function (key) {
        var process = processes[key];
        process.number = key;
        return process;
      });
      Popup.renderList(processesList);
      Popup.showCorrectTab(processesList);
    });
  },

  clearAllProcessesStatus: function () {
    ProcessStore.clearAllProcessesStatus(Popup.updateView);
  },

  newList: function () {
    Popup.updateTabs({show: 'submit-form', hide: 'list'});
  },

  showCorrectTab: function (processes) {
    if (Object.keys(processes).length > 0) {
      Popup.updateTabs({show: 'list', hide: 'submit-form'});
    } else {
      Popup.updateTabs({show: 'submit-form', hide: 'list'});
    }
  },

  updateTabs: function (actions) {
    var tabToHide = document.getElementById(actions.hide);
    tabToHide.style.display = 'none';

    var tabToShow = document.getElementById(actions.show);
    tabToShow.style.display = '';
  },

  renderList: function (processes) {
    var list = document.querySelector('#list ul');
    var markup = processes.reduce(function (output, process) {
      var marked = process.isViewed ? " &#10004;" : "";
      return output + "<li>" + process.number + marked + "</li>";
    }, '');
    list.innerHTML = markup;
  },

  getValueFromInput: function() {
    var input = document.getElementById('processesInput');
    return input.value;
  }
};

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
