describe('Parser', function () {
  it('should parse one id to a list of one id', function() {
    expect(parseToListOfProcesses("1234")).toEqual(["1234"]);
  });
});


