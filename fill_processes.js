var processNumbers = ['00151400106370'];
var iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  var iframeDocument = iframe.contentWindow.document;

  var processInput = iframeDocument.getElementById('num_processo_mask');
  var processInfo = iframeDocument.getElementById('conteudo');

  if (processInput) {
    processInput.setAttribute('value', processNumbers[0]);
  } else if (processInfo) {
    var processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
    if (processURI.indexOf(processNumbers[0]) > -1) {
      processNumbers.splice(0, 1);
    }
  }
};
