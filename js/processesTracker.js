var iframe = document.getElementById('iframeBusca');
var processPattern = /num_processo_mask=(\d+)/;

iframe.onload = function() {
  var iframeDocument = iframe.contentWindow.document;

  var processInput = iframeDocument.getElementById('num_processo_mask');
  var processInfo = iframeDocument.getElementById('conteudo');

  if (processInput) {
    ProcessStore.getNextProcess(function(nextProcess) {
      processInput.setAttribute('value', nextProcess);
    });
  } else if (processInfo) {
    var processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
    var processNumber = processPattern.exec(processURI)[1];
    if (processNumber) {
      ProcessStore.updateViewStatus(processNumber);
    }
  }
};
