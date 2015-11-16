describe('EscribaHelper', function() {
  var iframeDocument, processInput, processInfo, invalidText;

  beforeEach(function(){
    processInput = jasmine.createSpyObj('input', ['setAttribute']);
    processInfo = {};

    iframeDocument = jasmine.createSpyObj('iframe', ['getElementById', 'getElementsByClassName']);
    invalidText = { innerText: 'NÚMERO 1234567 INVÁLIDO', baseURI: 'url/num_processo_mask=1234567' };
    iframeDocument.getElementsByClassName = function() { return [{}, invalidText]; };

    spyOn(ProcessStore, 'getNextProcess');
    spyOn(ProcessStore, 'markAsViewed');
  });

  it('retrieves the next process from the ProcessStore when on input page', function() {
    var captchaInput, callback;

    captchaInput = jasmine.createSpyObj('captchaInput', ['focus']);
    iframeDocument.getElementById = function(id) {
      if (id === 'num_processo_mask') return processInput;
      if (id === 'code') return captchaInput;
    };

    EscribaHelper.updateProcessForPage(iframeDocument);
    expect(ProcessStore.getNextProcess).toHaveBeenCalled();

    callback = ProcessStore.getNextProcess.calls.mostRecent().args[0];
    callback('1234567');
    expect(processInput.setAttribute).toHaveBeenCalledWith('value', '1234567');
    expect(captchaInput.focus).toHaveBeenCalled();
  });

  describe('info page', function() {
    beforeEach(function() {
      iframeDocument.getElementById = function(id) {
        if (id === 'conteudo') return processInfo;
      };
      var tableContent = [{firstChild: {baseURI: 'url/num_processo_mask=1234567'}}];
      processInfo.getElementsByTagName = function() { return tableContent; };
      var updatesTable = { rows: [{ querySelector: function() {
        return { innerText: 'data'};
      }}]};
      processInfo.querySelector = function() { return updatesTable; };

      spyOn(UpdateHandler, 'isNew');

      EscribaHelper.updateProcessForPage(iframeDocument);
    });

    it('updates view status for process when on info page', function() {
      expect(ProcessStore.markAsViewed).toHaveBeenCalledWith('1234567');
    });

    it('retrieves last updates when on info page', function() {
      expect(UpdateHandler.isNew).toHaveBeenCalledWith('data');
    });
  });

  it('updates view status for process when on error page', function() {
    EscribaHelper.updateProcessForPage(iframeDocument);

    expect(ProcessStore.markAsViewed).toHaveBeenCalledWith('1234567');
  });
});
