var Parser = {
  processNumbersPattern: /\bn.{0,7} do processo[:\n\s]+?([\d\.\\\\/-]+)/gi,
  displayNumberPattern: /[\d\.\\\\/-]/gi,
  specialCharsPattern: /[^\d]/g,
  parseToListOfProcesses: function (value) {
    if (!value) return null;
    var processNumbers = value.match(Parser.processNumbersPattern);
    if (!processNumbers) return null;
    return processNumbers.map(function(number) {
      return {
        number: number.replace(Parser.specialCharsPattern, ''),
        displayNumber: number.match(Parser.displayNumberPattern).join('')
      }
    });
  }
};
