describe('parseToListOfProcesses', function () {
  it('should parse one id to a list of one id', function() {
    expect(parseToListOfProcesses("1234")).toEqual(["1234"]);
  });
  it('should parse a string with a list of strings separate by comma', function() {
    expect(parseToListOfProcesses("1,2,3,4,5")).toEqual(["1", "2", "3", "4", "5"]);
  });
});



