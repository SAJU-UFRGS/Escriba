describe('ProcessStore', function() {
  var setCalled, getCalled, clearCalled;
  beforeEach(function(){
    setCalled = getCalled = clearCalled = false;
    chrome.storage = {
      local: {
        set: function() { setCalled = true },
        get: function() { getCalled = true },
        clear: function() { clearCalled = true }
      }
    }
  })

  it('saves a new process in local storage', function() {
    ProcessStore.save('12345678');
    expect(setCalled).toBe(true);
  });

  it('updates the status of a process in local storage', function() {
    ProcessStore.updateViewStatus('12345678');
    expect(setCalled).toBe(true);
  });

  it('retrieves not viewed process in local storage', function() {
    ProcessStore.getNextProcess();
    expect(getCalled).toBe(true);
  });

  it('clears storage', function() {
    ProcessStore.clear();
    expect(clearCalled).toBe(true);
  });
});
