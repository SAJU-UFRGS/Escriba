describe('processesTracker', function() {
  var iframeDocument, processInput, processInfo, invalidText;

  beforeEach(function(){
    processInput = jasmine.createSpyObj('input', ['setAttribute']);
    processInfo = {};

    iframeDocument = jasmine.createSpyObj('iframe', ['getElementById', 'getElementsByClassName']);
    invalidText = { innerText: 'NÚMERO 1234567 INVÁLIDO', baseURI: 'url/num_processo_mask=1234567' };
    iframeDocument.getElementsByClassName = function() { return [{}, invalidText]; }

    spyOn(ProcessStore, 'getNextProcess');
    spyOn(ProcessStore, 'updateViewStatus');
  });

  it('retrieves the next process from the ProcessStore when on input page', function() {
    iframeDocument.getElementById = function(id) {
      if (id === 'num_processo_mask') return processInput;
    };

    EscribaHelper.updateProcessForPage(iframeDocument);
    expect(ProcessStore.getNextProcess).toHaveBeenCalled();

    var callback = ProcessStore.getNextProcess.calls.mostRecent().args[0];
    callback('1234567');
    expect(processInput.setAttribute).toHaveBeenCalledWith('value', '1234567');
  });

  it('updates view status for process when on info page', function() {
    iframeDocument.getElementById = function(id) {
      if (id === 'conteudo') return processInfo;
    };
    var tableContent = [{firstChild: {baseURI: 'url/num_processo_mask=1234567'}}];
    processInfo.getElementsByTagName = function() { return tableContent; }

    EscribaHelper.updateProcessForPage(iframeDocument);

    expect(ProcessStore.updateViewStatus).toHaveBeenCalledWith('1234567');
  });

  it('updates view status for process when on error page', function() {
    EscribaHelper.updateProcessForPage(iframeDocument);

    expect(ProcessStore.updateViewStatus).toHaveBeenCalledWith('1234567');
  });
});
