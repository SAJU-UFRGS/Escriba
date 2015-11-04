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

  _setValueAndFocusOnCaptcha: function(input, iframeDocument) {
      ProcessStore.getNextProcess(function(nextProcess) {
        if (nextProcess) {
          input.setAttribute('value', nextProcess);
          iframeDocument.getElementById('code').focus();
        }
      });
  },

  updateProcessForPage: function(iframeDocument) {
    processInput = iframeDocument.getElementById('num_processo_mask');
    processInfo = iframeDocument.getElementById('conteudo');
    processError = iframeDocument.getElementsByClassName('fonte_grande')[1];

    if (processInput) {
      this._setValueAndFocusOnCaptcha(processInput, iframeDocument);
    } else if (processInfo) {
      processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
      this._findNumberFromURIAndUpdateProcess(processURI);
    } else if (this._isErrorPage(processError)) {
      processURI = processError.baseURI;
      this._findNumberFromURIAndUpdateProcess(processURI);
    }
  }
}
