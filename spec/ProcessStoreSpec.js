describe('ProcessStore', function() {
  var storage;
  var processList = [
    { number: '123', displayNumber: '123-567' },
    { number: '456', displayNumber: '123-567' }
  ]

  beforeEach(function(){
    storage = jasmine.createSpyObj('storage', ['get', 'set', 'clear']);
    chrome.storage = {local: storage};
  });

  describe('create', function () {
    it('creates multiple processes with callback and empty properties', function () {
      var callback = function() {};
      ProcessStore.create(processList, callback);
      expect(storage.set).toHaveBeenCalledWith({
        '123': {index: 0, number: '123', displayNumber: '123-567'},
        '456': {index: 1, number: '456', displayNumber: '123-567'}}, callback);
    });

    it('creates multiple processes with callback and properties', function () {
      var callback = function() {};
      ProcessStore.create(processList, callback, {a: 1});
      expect(storage.set).toHaveBeenCalledWith({
        '123': {a: 1, index: 0, number: '123', displayNumber: '123-567'},
        '456': {a: 1, index: 1, number: '456', displayNumber: '123-567'}}, callback);
    });

    it('creates multiple processes with properties and without callback', function () {
      ProcessStore.create(processList, null, {a: 1});
      expect(storage.set).toHaveBeenCalledWith({
        '123': {a: 1, index: 0, number: '123', displayNumber: '123-567'},
        '456': {a: 1, index: 1, number: '456', displayNumber: '123-567'}}, null);
    });

    it('creates multiple processes without callback and properties', function () {
      ProcessStore.create(processList);
      expect(storage.set).toHaveBeenCalledWith({
        '123': {index: 0, number: '123', displayNumber: '123-567'},
        '456': {index: 1, number: '456', displayNumber: '123-567'}}, undefined);
    });
  });

  describe('updateProcess', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, callback) {
        if (arg == '456') callback({'456': {isViewed: false, index: 1, number: '456'}});
      });
    });

    it('updates process data in local storage', function() {
      ProcessStore.updateProcess('456', {a: 1, isViewed: true});
      expect(storage.set).toHaveBeenCalledWith({'456': {isViewed: true, index: 1, number: '456', a: 1}});
    });
  });

  describe('getNextProcess', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, filter) {
        filter({
          '456': {isViewed: false, index: 1, number: '456'},
          '789' : {index: 2, number: '789'},
          '123': {isViewed: true, index: 0, number: '123'}
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

      expect(result).toEqual({isViewed: true, index: 0, number: '123'});
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
      callback({'123': {isViewed: true, number: '123', index: 0, updates: null }, '456': { isViewed: true, number: '456', index: 1, updates: [{date: '10/10/10', update: 'Old Update'}] }});
      expect(storage.set).toHaveBeenCalledWith({'123': { number: '123', isViewed: false, index: 0, updates: null }, '456': { number: '456', isViewed: false, index: 1, updates: null }}, undefined);
    });
  });

  describe('getUpdatedProcesses', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, callback) {
        callback({
          '1': {index: 0, number:  '1', updates: null},
          '2': {isViewed: true, index: 1, number: '2', updates: [{update: 'u1', date: 'd1'}]},
          '3': {isViewed: false, index: 2, number: '3'},
          '4': {isViewed: true, index: 3, number: '4', updates: [{update: 'u2', date: 'd2'}]},
          '5': {isViewed: false, index: 4, number: '5', updates: []}
        });
      });
    });

    it('retrieves all updated processes', function() {
      var result;

      ProcessStore.getUpdatedProcesses(function (processes) {
        result = processes;
      });

      expect(result).toEqual([
        {isViewed: true, index: 1, number: '2', updates: [{update: 'u1', date: 'd1'}]},
        {isViewed: true, index: 3, number: '4', updates: [{update: 'u2', date: 'd2'}]}
      ]);
    });
  });

  describe('getAllProcesses', function () {
    beforeEach(function () {
      storage.get.and.callFake(function (arg, callback) {
        callback({
          '789' : {index: 3, number:  '789'},
          '456': {isViewed: false, index: 1, number: '456'},
          '123': {isViewed: true, index: 0, number: '123'},
          '0': {isViewed: true, index: 2, number: '0'},
        });
      });
    });

    it('retrieves all processes sorted', function() {
      var result;

      ProcessStore.getAllProcesses(function (processes) {
        result = processes;
      });

      expect(result).toEqual([
        {isViewed: true, index: 0, number: '123'},
        {isViewed: false, index: 1, number: '456'},
        {isViewed: true, index: 2, number: '0'},
        {index: 3, number:  '789'}
      ]);
    });
  });
});
