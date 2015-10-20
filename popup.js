document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('register');
  button.addEventListener('click', loadProcesses);
});

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('clear');
  button.addEventListener('click', clearAllProcessesStatus);
});

function loadProcesses() {
  var value = getValueFromInput();
  var listOfProcesses = parseToListOfProcesses(value);
  store(listOfProcesses);
  console.log(listOfProcesses);
}

function getValueFromInput() {
  var input = document.getElementById('processesInput');
  return input.value;
}

function store(listOfProcesses) {
  ProcessStore.clear();
  listOfProcesses.forEach(function(process) {
    ProcessStore.save(process);
  })
}

function clearAllProcessesStatus() {
  ProcessStore.clearAllProcessesStatus();
}
