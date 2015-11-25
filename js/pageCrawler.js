var iframe;
iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  EscribaHelper.windowDocument = document;
  EscribaHelper.iframeDocument = iframe.contentWindow.document;
  EscribaHelper.updateProcessForPage();
  EscribaHelper.toggleSidebard();
};
