describe('parseToListOfProcesses', function () {
  it('should parse one id to a list of one id', function() {
    expect(Parser.parseToListOfProcesses('numero do processo: 0011234'))
      .toEqual([{ number: '0011234', displayNumber: '0011234' }]);
  });

  it('should parse string with ú', function() {
    expect(Parser.parseToListOfProcesses('número do processo: 0011234'))
      .toEqual([{ number: '0011234', displayNumber: '0011234' }]);
  });

  it('should parse string with nº', function() {
    expect(Parser.parseToListOfProcesses('nº do processo: 0011234'))
      .toEqual([{ number: '0011234', displayNumber: '0011234' }]);
  });

  it('should parse string with n', function() {
    expect(Parser.parseToListOfProcesses('n do processo: 0011234'))
      .toEqual([{ number: '0011234', displayNumber: '0011234' }]);
  });

  it('should not parse string with something before n', function() {
    expect(Parser.parseToListOfProcesses('dsdn do processo: 0011234'))
      .toEqual(null);
  });

  it('should parse one id to a list of one id ignoring case', function() {
    expect(Parser.parseToListOfProcesses('numerO do Processo\n 7001234'))
      .toEqual([{ number: '7001234', displayNumber: '7001234' }]);
  });

  it('should parse one id to a list of one id with dots or slashes', function() {
    expect(Parser.parseToListOfProcesses('numero do processo: 700.123/4'))
      .toEqual([{ number: '7001234', displayNumber: '700.123/4' }]);
  });

  it('should parse a string with a list of strings separate by comma', function() {
    expect(Parser.parseToListOfProcesses('Numero do Processo 0011,no Do processo: ' +
            '001/2,numero do processo: 001.5'))
              .toEqual([
                { number: '0011', displayNumber: '0011' },
                { number: '0012', displayNumber: '001/2' },
                { number: '0015', displayNumber: '001.5' }]);
  });

  it('not should parse a string with invalid ids', function() {
    expect(Parser.parseToListOfProcesses('00,numer: 01/2,numero do processo: a0.1.5'))
      .toEqual(null);
  });

  it('should parse a string with some valid ids', function() {
    expect(Parser.parseToListOfProcesses('numero do processo 0011,numero do processo: ' +
            'abddc,numero do processo: cdas1,,numero do processo: 001/2,numero dx processo: 12345,numero do processo: 001.5'))
              .toEqual([
                { number: '0011', displayNumber: '0011' },
                { number: '0012', displayNumber: '001/2' },
                { number: '0015', displayNumber: '001.5' }]);
  });

  it('should return null if empty or null', function() {
    expect(Parser.parseToListOfProcesses('')).toEqual(null);
    expect(Parser.parseToListOfProcesses(null)).toEqual(null);
    expect(Parser.parseToListOfProcesses('numero do processo: ')).toEqual(null);
  });
});
