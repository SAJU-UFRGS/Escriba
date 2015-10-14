chrome.storage.local.set({'processes': {'00151400106370': {}}});

var iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  var iframeDocument = iframe.contentWindow.document;

  var processInput = iframeDocument.getElementById('num_processo_mask');
  var processInfo = iframeDocument.getElementById('conteudo');

  chrome.storage.local.get('processes', function(data) {
    var processNumbers = data.processes;
    if (processInput) {
      processInput.setAttribute('value', Object.keys(processNumbers)[0]);
    } else if (processInfo) {
      var processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
      if (processURI.indexOf(processNumbers[0]) > -1) {
        processNumbers.splice(0, 1);
      }
    }
  });

};
