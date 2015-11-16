describe('ProcessStore', function() {
  var storage;

  beforeEach(function(){
    storage = jasmine.createSpyObj('storage', ['get', 'set', 'clear']);
    chrome.storage = {local: storage};
  });

  describe('create', function () {
    it('creates multiple processes with callback and empty properties', function () {
      var callback = function() {};
      ProcessStore.create(['123', '456'], callback);
      expect(storage.set).toHaveBeenCalledWith({'123': {index: 0, id: '123'}, '456': {index: 1, id: '456'}}, callback);
    });

    it('creates multiple processes with callback and properties', function () {
      var callback = function() {};
      ProcessStore.create(['123', '456'], callback, {a: 1});
      expect(storage.set).toHaveBeenCalledWith({'123': {a: 1, index: 0, id: '123'}, '456': {a: 1, index: 1, id: '456'}}, callback);
    });

    it('creates multiple processes with properties and without callback', function () {
      ProcessStore.create(['123', '456'], null, {a: 1});
      expect(storage.set).toHaveBeenCalledWith({'123': {a: 1, index: 0, id: '123'}, '456': {a: 1, index: 1, id: '456'}}, null);
    });

    it('creates multiple processes without callback and properties', function () {
      ProcessStore.create(['123', '456']);
      expect(storage.set).toHaveBeenCalledWith({'123': {index: 0, id: '123'}, '456': {index: 1, id: '456'}}, undefined);
    });
  });

  describe('markAsViewed', function () {
    it('updates the status of a process in local storage', function() {
      ProcessStore.markAsViewed('12345678');
      expect(storage.set).toHaveBeenCalledWith({'12345678': {isViewed: true}});
    });
  });

  describe('getNextProcess', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, filter) {
        filter({
          '123': {isViewed: true, index: 0},
          '456': {isViewed: false, index: 1},
          '789' : {index: 2}
        });
      });
    });

    it('retrieves next process in local storage', function() {
      ProcessStore.getNextProcess(function () {});
      expect(storage.get).toHaveBeenCalledWith(null, jasmine.any(Function));
    });

    it('returns a processes marked as not viewed in local storage', function() {
      var result;

      ProcessStore.getNextProcess(function (elem) {
        result = elem;
      });

      expect(result).toEqual('456');
    });
  });

  describe('clear', function () {
    it('clears storage', function() {
      ProcessStore.clear('callback');
      expect(storage.clear).toHaveBeenCalledWith('callback');
    });
  });

  describe('markAllNotViewed', function () {
    it('clear process status', function() {
      ProcessStore.markAllNotViewed();
      expect(storage.get).toHaveBeenCalledWith(null, jasmine.any(Function));

      var callback = storage.get.calls.mostRecent().args[1];
      callback({'123': { isViewed: true, id: '123', index: 0 }, '456': { isViewed: true, id: '456', index: 1 }});
      expect(storage.set).toHaveBeenCalledWith({'123': { id: '123', isViewed: false, index: 0 }, '456': { id: '456', isViewed: false, index: 1 }}, undefined);
    });
  });

  describe('getAllProcesses', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, callback) {
        callback({
          '789' : {index: 3, id:  '789'},
          '456': {isViewed: false, index: 1, id: '456'},
          '123': {isViewed: true, index: 0, id: '123'},
          '0': {isViewed: true, index: 2, id: '0'},
        });
      });
    });

    it('retrieves all processes sorted', function() {
      var result;

      ProcessStore.getAllProcesses(function (processes) {
        result = processes;
      });

      expect(result).toEqual([
        {isViewed: true, index: 0, id: '123'},
        {isViewed: false, index: 1, id: '456'},
        {isViewed: true, index: 2, id: '0'},
        {index: 3, id:  '789'}
      ]);
    });
  });
});
