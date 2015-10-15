var iframe = document.getElementById('iframeBusca');
var processPattern = /num_processo_mask=(\d+)/;

iframe.onload = function() {
  var iframeDocument = iframe.contentWindow.document;

  var processInput = iframeDocument.getElementById('num_processo_mask');
  var processInfo = iframeDocument.getElementById('conteudo');

  chrome.storage.local.get(null, function(processNumbers) {
    if (processInput) {
      processInput.setAttribute('value', Object.keys(processNumbers)[0]);
    } else if (processInfo) {
      var processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
      var processNumber = processPattern.exec(processURI)[1];
      if (processNumber) {
        var processToBeSaved = {};
        processToBeSaved[processNumber] = { isViewed: true };
        chrome.storage.local.set(processToBeSaved);
      }
    }
  });

};
