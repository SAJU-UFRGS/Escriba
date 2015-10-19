describe('parseToListOfProcesses', function () {
  it('should parse one id to a list of one id', function() {
    expect(parseToListOfProcesses("numero do processo: 0011234")).toEqual(["0011234"]);
  });
  it('should parse one id to a list of one id ignoring case', function() {
    expect(parseToListOfProcesses("numero do processo: 7001234")).toEqual(["7001234"]);
  });
  it('should parse one id to a list of one id with dots or slashes', function() {
    expect(parseToListOfProcesses("numero do processo: 700.123/4")).toEqual(["7001234"]);
  });
  it('should parse a string with a list of strings separate by comma', function() {
    expect(parseToListOfProcesses("Numero do Processo: 0011,no Do processo: " +
            "001/2,numero do processo: 001.5")).toEqual(["0011", "0012", "0015"]);
  });
  it('not should parse a string with invalid ids', function() {
    expect(parseToListOfProcesses("00,numer: 01/2,numero do processo: a0.1.5")).toEqual(null);
  });
  it('should parse a string with some valid ids', function() {
    expect(parseToListOfProcesses("numero do processo: 0011,numero do processo: " +
            "abddc,numero do processo: cdas1,,numero do processo: 001/2,numero dx processo: 12345,numero do processo: 001.5")).toEqual(["0011", "0012", "0015"]);
  });
  it('should return null if empty or null', function() {
    expect(parseToListOfProcesses("")).toEqual(null);
    expect(parseToListOfProcesses(null)).toEqual(null);
    expect(parseToListOfProcesses("numero do processo: ")).toEqual(null);
  });
});



