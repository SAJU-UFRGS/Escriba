document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementsByTagName('button');
  button[0].addEventListener('click', loadProcesses);
});

function loadProcesses() {
  var value = getValueFromInput();
  var listOfProcesses = parseToListOfProcesses(value);
  console.log(listOfProcesses);
}

function getValueFromInput() {
  var input = document.getElementById('processesInput');
  return input.value;
}

