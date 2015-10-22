document.addEventListener('DOMContentLoaded', function() {
  var registerButton = document.getElementById('register');
  registerButton.addEventListener('click', loadProcesses);

  var restartButton = document.getElementById('restart');
  restartButton.addEventListener('click', clearAllProcessesStatus);

  var clearButton = document.getElementById('new');
  clearButton.addEventListener('click', newList);

  showCorrectTab();
});

function loadProcesses() {
  var value = getValueFromInput();
  var processesList = parseToListOfProcesses(value);
  store(processesList);
}

function getValueFromInput() {
  var input = document.getElementById('processesInput');
  return input.value;
}

function store(processesList) {
  ProcessStore.clear();
  ProcessStore.saveMultiple(processesList, showCorrectTab);
}

function clearAllProcessesStatus() {
  ProcessStore.clearAllProcessesStatus();
}

function newList() {
  showFormTab();
}

function showCorrectTab() {
  ProcessStore.getAllProcesses(function (processes) {
    if (Object.keys(processes).length > 0) {
      showListTab();
    } else {
      showFormTab();
    }
  });
}

function showListTab() {
  showTab('list');
}

function showFormTab() {
  showTab('submit-form');
}

function showTab(id) {
  var sections = document.querySelectorAll('section');
  Array.prototype.forEach.call(sections, function(section){
    section.style.display = 'none';
  });

  var tab = document.getElementById(id);
  tab.style.display = '';
}
