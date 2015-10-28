var Parser = {
  processNumbersPattern: /(?:No|Numero) do processo[:\n\s]+?([\d\.\\\\/-]+)/gi,
  specialCharsPattern: /[^\d]/g,
  parseToListOfProcesses: function (value) {
    if (!value) return null;
    var processNumbers = value.match(Parser.processNumbersPattern);
    if (!processNumbers) return null;
    return processNumbers.map(function(number) {
      return number.replace(Parser.specialCharsPattern, '');
    });
  }
};
