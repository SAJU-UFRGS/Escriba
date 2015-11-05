describe('Popup', function() {
  var fakeDOM;
  
  fakeDOM = {
    'list': document.createElement('ul'),
    'submit-form': document.createElement('form'),
    'processCount': document.createElement('h4'),
    'processesInput': document.createElement('textarea')
  };

  beforeEach(function() {
    fakeDOM.processCount.innerHTML = '';

    spyOn(ProcessStore, 'markAllNotViewed');

    spyOn(document, 'getElementById').and.callFake(function(id) {
      return fakeDOM[id];
    });
  });

  describe('updateCount', function () {
    it('appends total number of processes', function () {
      Popup.updateCount(['132443', '3213214', '4231232']);

      expect(fakeDOM.processCount.innerHTML).toEqual('3');
    });

    it('does not show count when no processes', function () {
      Popup.updateCount([]);

      expect(fakeDOM.processCount.innerHTML).toEqual('0');
    });
  });

  describe('getValueFromInput', function () {
    it('retrieves input', function () {
      fakeDOM.processesInput.value = 'Hello';
      expect(Popup.getValueFromInput()).toEqual('Hello');
    });
  });

  describe('updateTabs', function () {
    it('hides list and shows form', function () {
      Popup.updateTabs({show: 'submit-form', hide: 'list'});

      expect(fakeDOM.list.style.display).toEqual('none');
      expect(fakeDOM['submit-form'].style.display).toEqual('');
    });

    it('hides form and shows list', function () {
      Popup.updateTabs({show: 'list', hide: 'submit-form'});

      expect(fakeDOM.list.style.display).toEqual('');
      expect(fakeDOM['submit-form'].style.display).toEqual('none');
    });
  });

  describe('newList', function () {
    it('hides list and shows form', function () {
      Popup.newList();

      expect(fakeDOM.list.style.display).toEqual('none');
      expect(fakeDOM['submit-form'].style.display).toEqual('');
    });
  });

  describe('renderList', function () {
    it('lists all processes', function () {
      spyOn(document, 'querySelector').and.returnValue(fakeDOM.list);
      Popup.renderList([
        { number: '123' },
        { number: '567' }
      ]);

      expect(fakeDOM.list.innerHTML).toEqual('<li>123</li><li>567</li>');
    });

    it('lists marks viewed processes', function () {
      spyOn(document, 'querySelector').and.returnValue(fakeDOM.list);
      Popup.renderList([
        { number: '123', isViewed: true },
        { number: '567' }
      ]);

      expect(fakeDOM.list.innerHTML).toEqual('<li>123 ✔</li><li>567</li>');
    });
  });

  describe('clearAllProcessesStatus', function () {
    it('calls ProcessStore markAllNotViewed', function () {
      Popup.clearAllProcessesStatus();

      expect(ProcessStore.markAllNotViewed).toHaveBeenCalled();
    });
  });

});
