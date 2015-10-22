document.addEventListener('DOMContentLoaded', function() {
  var registerButton = document.getElementById('register');
  registerButton.addEventListener('click', loadProcesses);

  var restartButton = document.getElementById('restart');
  restartButton.addEventListener('click', clearAllProcessesStatus);

  var clearButton = document.getElementById('new');
  clearButton.addEventListener('click', newList);

  updateView();
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

function updateView() {
  ProcessStore.getAllProcesses(function (processes) {
    var processesList = Object.keys(processes).map(function (key) {
      var process = processes[key];
      process.number = key;
      return process;
    });
    updateList(processesList);
    showCorrectTab(processesList);
  });
}

function store(processesList) {
  ProcessStore.clear();
  ProcessStore.saveMultiple(processesList, updateView);
}

function clearAllProcessesStatus() {
  ProcessStore.clearAllProcessesStatus(updateView);
}

function newList() {
  showFormTab();
}

function showCorrectTab(processes) {
  if (Object.keys(processes).length > 0) {
    showListTab();
  } else {
    showFormTab();
  }
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

function updateList(processes) {
  var list = document.querySelector('#list ul');
  var markup = processes.reduce(function (output, process) {
    var marked = process.isViewed ? " &#10004;" : "";
    return output + "<li>" + process.number + marked + "</li>";
  }, '');
  list.innerHTML = markup;
}
