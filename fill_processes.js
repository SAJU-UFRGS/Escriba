var processNumbers = ['00151400106370'];
var iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  var iframeDocument = iframe.contentWindow.document;
  var processInput = iframeDocument.getElementById('num_processo_mask');
  processInput.setAttribute('value', processNumbers[0]);
};
