describe('Popup', function() {
  var list = document.createElement('ul');
  var form = document.createElement('form');
  var countElement = document.createElement('h4');
  var input = document.createElement('textarea');

  beforeEach(function() {
    countElement.innerHTML = '';

    spyOn(ProcessStore, 'markAllNotViewed');

    spyOn(document, 'getElementById').and.callFake(function(id) {
      if (id === 'list') return list;
      if (id === 'submit-form') return form;
      if (id === 'processCount') return countElement;
      if (id === 'processesInput') return input;
    });
  });

  describe('updateCount', function () {
    it('appends total number of processes', function () {
      Popup.updateCount(['132443', '3213214', '4231232']);

      expect(countElement.innerHTML).toEqual('3');
    });

    it('does not show count when no processes', function () {
      Popup.updateCount([]);

      expect(countElement.innerHTML).toEqual('0');
    });
  });

  describe('getValueFromInput', function () {
    it('retrieves input', function () {
      input.value = "Hello";
      expect(Popup.getValueFromInput()).toEqual('Hello');
    });
  });

  describe('updateTabs', function () {
    it('hides list and shows form', function () {
      Popup.updateTabs({show: 'submit-form', hide: 'list'});

      expect(list.style.display).toEqual('none');
      expect(form.style.display).toEqual('');
    });

    it('hides form and shows list', function () {
      Popup.updateTabs({show: 'list', hide: 'submit-form'});

      expect(list.style.display).toEqual('');
      expect(form.style.display).toEqual('none');
    });
  });

  describe('newList', function () {
    it('hides list and shows form', function () {
      Popup.newList();

      expect(list.style.display).toEqual('none');
      expect(form.style.display).toEqual('');
    });
  });

  describe('renderList', function () {
    it('lists all processes', function () {
      spyOn(document, 'querySelector').and.returnValue(list);
      Popup.renderList([
        { number: '123' },
        { number: '567' }
      ]);

      expect(list.innerHTML).toEqual('<li>123</li><li>567</li>');
    });

    it('lists marks viewed processes', function () {
      spyOn(document, 'querySelector').and.returnValue(list);
      Popup.renderList([
        { number: '123', isViewed: true },
        { number: '567' }
      ]);

      expect(list.innerHTML).toEqual('<li>123 ✔</li><li>567</li>');
    });
  });

  describe('clearAllProcessesStatus', function () {
    it('calls ProcessStore markAllNotViewed', function () {
      Popup.clearAllProcessesStatus();

      expect(ProcessStore.markAllNotViewed).toHaveBeenCalled();
    });
  });

});
