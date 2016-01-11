var iframe;
iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  if (Features.showSidebar) {
    Sidebar.windowDocument = document;
    var sidebar = document.getElementById('sidebar');
    if (sidebar === null) {
      Sidebar.setUp();
    }
  }

  EscribaHelper.iframeDocument = iframe.contentWindow.document;
  EscribaHelper.updateProcessForPage();
};
