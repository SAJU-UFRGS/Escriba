var Sidebar = {
  windowDocument: {},

  setUp: function() {
    var sidebar = this.windowDocument.createElement('div');
    sidebar.id = "sidebar";
    sidebar.className = "pure-menu custom-restricted-width";
    sidebar.innerHTML = "\
      <span class=\"pure-menu-heading\">Movimentações Recentes</span>\
      <span class=\"toggle-button\">+</span>\
      <ul class=\"pure-menu-list\">\
      <ul>\
      ";
    this.windowDocument.body.appendChild(sidebar);
    sidebar.addEventListener('click', function() {
      Sidebar.toggleSidebar();
    });

    var content = this.windowDocument.getElementById('conteudo');
    content.style.marginLeft = "22%";
  },

  toggleSidebar: function(options) {
    options = options || {}
    var el = this.windowDocument.getElementById('sidebar');
    el.className += " hidden";
    var content = this.windowDocument.getElementById('conteudo');
    content.style.marginLeft = "auto";
  }
}
