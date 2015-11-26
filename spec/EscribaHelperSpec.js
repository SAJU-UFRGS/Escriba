describe('EscribaHelper', function() {
  var iframeDocument, processInput, processInfo, invalidText;

  beforeEach(function(){
    processInput = jasmine.createSpyObj('input', ['setAttribute']);
    processInfo = {};

    iframeDocument = jasmine.createSpyObj('iframe',
      ['getElementById', 'getElementsByClassName', 'createElement']);
    invalidText = { innerText: 'NÚMERO 1234567 INVÁLIDO', baseURI: 'url/num_processo_mask=1234567' };
    iframeDocument.getElementsByClassName = function() { return [{}, invalidText]; };

    EscribaHelper.iframeDocument = iframeDocument;

    spyOn(ProcessStore, 'getNextProcess');
    spyOn(ProcessStore, 'updateProcess');
  });

  describe('input page', function() {
    it('retrieves the next process from the ProcessStore when on input page', function() {
      var captchaInput, callback;

      captchaInput = jasmine.createSpyObj('captchaInput', ['focus']);
      iframeDocument.getElementById = function(id) {
        if (id === 'num_processo_mask') return processInput;
        if (id === 'code') return captchaInput;
      }

      EscribaHelper.iframeDocument = iframeDocument;
      EscribaHelper.updateProcessForPage();
      expect(ProcessStore.getNextProcess).toHaveBeenCalled();

      callback = ProcessStore.getNextProcess.calls.mostRecent().args[0];
      callback('1234567');
      expect(processInput.setAttribute).toHaveBeenCalledWith('value', '1234567');
      expect(captchaInput.focus).toHaveBeenCalled();
    });
  });

  describe('info page', function() {
    beforeEach(function() {
      iframeDocument.getElementById = function(id) {
        if (id === 'conteudo') return processInfo;
      };
      var tableContent = [{firstChild: {baseURI: 'url/num_processo_mask=1234567'}}];
      processInfo.getElementsByTagName = function() { return tableContent; };
      var updatesTable = { rows: [{ querySelector: function(query) {
        switch(query) {
          case 'td:nth-of-type(2)': return {innerText: '10/10/10'};
          case 'td:nth-of-type(3)': return {innerText: 'New Update'};
        }
      }}]};
      processInfo.querySelector = function() { return updatesTable; };

      spyOn(UpdateHandler, 'isNew').and.returnValue(true);

      EscribaHelper.iframeDocument = iframeDocument;
      EscribaHelper.updateProcessForPage();
    });

    it('updates view status for process when on info page', function() {
      expect(ProcessStore.updateProcess).toHaveBeenCalledWith('1234567', {isViewed: true, updates: [{date: '10/10/10', update: 'New Update'}]});
    });

    it('retrieves last updates when on info page', function() {
      expect(UpdateHandler.isNew).toHaveBeenCalledWith('10/10/10');
    });
  });

  it('updates view status for process when on error page', function() {
    EscribaHelper.updateProcessForPage();

    expect(ProcessStore.updateProcess).toHaveBeenCalledWith('1234567', {isViewed: true, updates: null});
  });

  describe('toggles sidebar', function() {
    var sidebar = {
      id: 'sidebar', style: {}, parentNode: { removeChild: function() {} }
    };

    beforeEach(function() {
      iframeDocument.getElementById = function() { return sidebar };
      iframeDocument.createElement = function() { return sidebar };
      iframeDocument.body = { appendChild: function() {} };

      EscribaHelper.windowDocument = iframeDocument;
    });

    it('opens sidebar', function() {
      EscribaHelper.toggleSidebar();

      expect(sidebar.innerHTML).toContain('Movimentações Recentes');
      expect(EscribaHelper.sidebarOpen).toEqual(true);
    });

    it('closes sidebar', function() {
      EscribaHelper.toggleSidebar();

      expect(EscribaHelper.sidebarOpen).toEqual(false);
    });
  });
});
