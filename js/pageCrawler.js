var iframe;
iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  if (Features.showSidebar) {
    Sidebar.windowDocument = document;
    Sidebar.setUp();
  }

  EscribaHelper.iframeDocument = iframe.contentWindow.document;
  EscribaHelper.updateProcessForPage();
};
