var iframeDocument;
var iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  iframeDocument = iframe.contentWindow.document;
  EscribaHelper.updateProcessForPage(iframeDocument);
};
