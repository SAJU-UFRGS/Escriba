var processInput,
    processInfo,
    processError,
    processURI,
    processNumber;

var EscribaHelper = {
  processPattern: /num_processo_mask=(\d+)/,

  _findNumberFromURIAndUpdateProcess: function(uri) {
    processNumber = this.processPattern.exec(uri)[1];
    if (processNumber) {
      ProcessStore.updateViewStatus(processNumber);
    }
  },

  _isErrorPage: function(pageText) {
    return pageText && pageText.innerText.indexOf("INVÁLIDO") > -1;
  },

  updateProcessForPage: function(iframeDocument) {
    processInput = iframeDocument.getElementById('num_processo_mask');
    processInfo = iframeDocument.getElementById('conteudo');
    processError = iframeDocument.getElementsByClassName('fonte_grande')[1];

    if (processInput) {
      ProcessStore.getNextProcess(function(nextProcess) {
        if (nextProcess) processInput.setAttribute('value', nextProcess);
      });
    } else if (processInfo) {
      processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
      this._findNumberFromURIAndUpdateProcess(processURI);
    } else if (this._isErrorPage(processError)) {
      processURI = processError.baseURI;
      this._findNumberFromURIAndUpdateProcess(processURI);
    }
  }
}
