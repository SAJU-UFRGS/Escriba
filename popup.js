document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('register');
  button.addEventListener('click', loadProcesses);
});

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('restart');
  button.addEventListener('click', clearAllProcessesStatus);
});

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('clear');
  button.addEventListener('click', removeAllProcesses);
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

function removeAllProcesses() {
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
