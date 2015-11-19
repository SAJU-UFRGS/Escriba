var Popup = {
  setUp: function () {
    var registerButton, restartButton, clearButton;

    registerButton = document.getElementById('register');
    registerButton.addEventListener('click', DocUploader.loadProcesses);

    restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', Popup.clearAllProcessesStatus);

    clearButton = document.getElementById('new');
    clearButton.addEventListener('click', Popup.newList);
  },

  updateView: function () {
    ProcessStore.getAllProcesses(function (processes) {
      Popup.renderList(processes);
      Popup.showCorrectTab(processes);
    });
  },

  clearAllProcessesStatus: function () {
    ProcessStore.markAllNotViewed(Popup.updateView);
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
    var tabToHide, tabToShow;

    tabToHide = document.getElementById(actions.hide);
    tabToHide.style.display = 'none';

    tabToShow = document.getElementById(actions.show);
    tabToShow.style.display = '';
  },

  renderList: function (processes) {
    var list, markup;

    list = document.querySelector('#list ul');
    markup = processes.reduce(function (output, process) {
      var marked = process.isViewed ? ' &#10004;' : '';
      return output + '<li>' + process.displayNumber + marked + '</li>';
    }, '');
    list.innerHTML = markup;

    Popup.updateCount(processes);
  },

  updateCount: function(processes) {
    var count = document.getElementById('processCount');
    count.innerHTML = "Número total de processos: " + processes.length;
  },

  getValueFromInput: function() {
    var input = document.getElementById('processesInput');
    return input.value;
  }
};
