var iframe, style;

var insertCSS = function(file) {
  style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL(file);
  (document.head||document.documentElement).appendChild(style);
}

insertCSS('css/index.css');
insertCSS('node_modules/purecss/build/pure-min.css');

iframe = document.getElementById('iframeBusca');

iframe.onload = function() {
  Sidebar.windowDocument = document;
  var sidebar = document.getElementById('sidebar');
  if (sidebar === null) {
    Sidebar.setUp();
  }

  EscribaHelper.iframeDocument = iframe.contentWindow.document;
  EscribaHelper.updateProcessForPage();
};
