describe('ProcessStore', function() {
  var storage;

  beforeEach(function(){
    storage = jasmine.createSpyObj('storage', ['get', 'set', 'clear']);
    chrome.storage = {local: storage};
  });

  it('saves a new process in local storage', function() {
    ProcessStore.save('12345678');
    expect(storage.set).toHaveBeenCalledWith({'12345678': {}});
  });

  it('updates the status of a process in local storage', function() {
    ProcessStore.updateViewStatus('12345678');
    expect(storage.set).toHaveBeenCalledWith({'12345678': {isViewed: true}});
  });

  it('retrieves not viewed process in local storage', function() {
    ProcessStore.getNextProcess();
    expect(storage.get).toHaveBeenCalledWith(null, jasmine.any(Function));
  });

  it('clears storage', function() {
    var callback = function() {};
    ProcessStore.clear(callback);
    expect(storage.clear).toHaveBeenCalledWith(callback);
  });
});
