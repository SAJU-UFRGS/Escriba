describe('ProcessStore', function() {
  var storage;

  beforeEach(function(){
    storage = jasmine.createSpyObj('storage', ['get', 'set', 'clear']);
    chrome.storage = {local: storage};
  });

  describe('saveMultiple', function () {
    it('saves multiple processes with callback and empty properties', function () {
      var callback = function() {};
      ProcessStore.saveMultiple(['123', '456'], callback);
      expect(storage.set).toHaveBeenCalledWith({'123': {}, '456': {}}, callback);
    });

    it('saves multiple processes with callback and properties', function () {
      var callback = function() {};
      ProcessStore.saveMultiple(['123', '456'], callback, {a: 1});
      expect(storage.set).toHaveBeenCalledWith({'123': {a: 1}, '456': {a: 1}}, callback);
    });

    it('saves multiple processes with properties and without callback', function () {
      ProcessStore.saveMultiple(['123', '456'], null, {a: 1});
      expect(storage.set).toHaveBeenCalledWith({'123': {a: 1}, '456': {a: 1}}, null);
    });

    it('saves multiple processes without callback and properties', function () {
      ProcessStore.saveMultiple(['123', '456']);
      expect(storage.set).toHaveBeenCalledWith({'123': {}, '456': {}}, undefined);
    });
  });

  describe('markAsViewed', function () {
    it('updates the status of a process in local storage', function() {
      ProcessStore.markAsViewed('12345678');
      expect(storage.set).toHaveBeenCalledWith({'12345678': {isViewed: true}}, null);
    });
  });

  describe('getNextProcess', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, filter) {
        filter({
          '123': {isViewed: true},
          '456': {isViewed: false},
          '789' : {}
        });
      });
    });

    it('retrieves process in local storage', function() {
      ProcessStore.getNextProcess(function () {});
      expect(storage.get).toHaveBeenCalledWith(null, jasmine.any(Function));
    });

    it('returns a processes marked as not viewed in local storage', function() {
      var result;

      ProcessStore.getNextProcess(function () {
        result = arguments[0];
      });

      expect(result).toEqual('456')
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
      callback({'123': { isViewed: true }, '456': { isViewed: true }});
      expect(storage.set).toHaveBeenCalledWith({'123': { isViewed: false }, '456': { isViewed: false }}, undefined);
    });
  });
});
