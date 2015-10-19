var iframeDocument,
    processInput,
    processInfo,
    processError,
    processURI,
    processNumber;

var iframe = document.getElementById('iframeBusca');
var processPattern = /num_processo_mask=(\d+)/;

var findNumberFromURIAndUpdateProcess = function(uri) {
  processNumber = processPattern.exec(uri)[1];
  if (processNumber) {
    ProcessStore.updateViewStatus(processNumber);
  }
}

var errorPage = function(pageText) {
  return pageText && pageText.innerText.indexOf("INVÁLIDO") > -1;
}

iframe.onload = function() {
  iframeDocument = iframe.contentWindow.document;

  processInput = iframeDocument.getElementById('num_processo_mask');
  processInfo = iframeDocument.getElementById('conteudo');
  processError = iframeDocument.getElementsByClassName('fonte_grande')[1];

  if (processInput) {
    ProcessStore.getNextProcess(function(nextProcess) {
      if (nextProcess) processInput.setAttribute('value', nextProcess);
    });
  } else if (processInfo) {
    processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
    findNumberFromURIAndUpdateProcess(processURI);
  } else if (errorPage(processError)) {
    processURI = processError.baseURI;
    findNumberFromURIAndUpdateProcess(processURI);
  }
};
