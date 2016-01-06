describe('UpdateHandler', function() {
  it('checks if date is recent', function() {
    var today = new Date();
    var todayAsString = (today.getDate()) + '/' + (today.getMonth()+1) +
      '/' + today.getFullYear();
    var yesterday = (today.getDate()-1) + '/' + (today.getMonth()+1) +
      '/' + today.getFullYear();
    var threeDaysAgo = (today.getDate()-2) + '/' + (today.getMonth()+1) +
      '/' + today.getFullYear();
    var fourDaysAgo = (today.getDate()-3) + '/' + (today.getMonth()+1) +
      '/' + today.getFullYear();

    expect(UpdateHandler.isNew(todayAsString)).toBe(true);
    expect(UpdateHandler.isNew(yesterday)).toBe(false);
    expect(UpdateHandler.isNew(threeDaysAgo)).toBe(false);
    expect(UpdateHandler.isNew(fourDaysAgo)).toBe(false);
    expect(UpdateHandler.isNew('22/11/2014')).toBe(false);
  });
});
