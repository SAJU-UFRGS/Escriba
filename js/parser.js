var processNumbersPattern = /(?:No|Numero) do processo[:\n\s]+?([\d\.\\\\/-]+)/gmi;
var specialCharsPattern = /[^\d]/g;

function parseToListOfProcesses(value) {
  if (!value) return null;
  var processNumbers = value.match(processNumbersPattern);
  if (!processNumbers) return null;
  return processNumbers.map(function(number) {
    return number.replace(specialCharsPattern, '');
  });
}
