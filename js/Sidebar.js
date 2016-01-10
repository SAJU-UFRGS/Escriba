var Sidebar = {
  windowDocument: {},

  _createSidebar: function() {
    var sidebar = this.windowDocument.createElement('div');
    sidebar.id = "sidebar";
    sidebar.className = "pure-menu custom-restricted-width";
    sidebar.innerHTML = "\
      <span class=\"pure-menu-heading\">Movimentações Recentes</span>\
      <span id=\"toggle-button\" class=\"pure-button\">+</span>\
      <ul class=\"pure-menu-list\">\
      <ul>\
      ";
    this.windowDocument.body.appendChild(sidebar);
  },

  _setUpToggleButton: function() {
    var button = this.windowDocument.getElementById('toggle-button');
    button.addEventListener('click', function() {
      Sidebar.toggleSidebar();
    });
  },

  _slideContent: function(withSidebar) {
    var leftMargin = withSidebar ? "22%" : "auto";
    var content = this.windowDocument.getElementById('conteudo');
    content.style.marginLeft = leftMargin;
  },

  setUp: function() {
    this._createSidebar();
    this._setUpToggleButton();
    this._slideContent(true);
  },

  toggleSidebar: function(options) {
    options = options || {}
    var el = this.windowDocument.getElementById('sidebar');
    el.className += " hidden";

    this._slideContent(false);
  }
}
