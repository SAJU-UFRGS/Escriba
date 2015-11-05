var iframe;
iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  var iframeDocument;
  iframeDocument = iframe.contentWindow.document;
  EscribaHelper.updateProcessForPage(iframeDocument);
};
