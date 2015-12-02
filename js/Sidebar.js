var Sidebar = {
  windowDocument: {},
  sidebarOpen: false,

  toggleSidebar: function(options) {
    options = options || {}
    if(this.sidebarOpen && !options.open) {
      var el = this.windowDocument.getElementById('sidebar');
      el.parentNode.removeChild(el);
      this.sidebarOpen = false;
    }
    else {
      var sidebar = this.windowDocument.createElement('div');
      sidebar.id = "sidebar";
      sidebar.innerHTML = "\
        <div>Movimentações Recentes</div>\
        ";
      this.windowDocument.body.appendChild(sidebar);
      this.sidebarOpen = true;
    }
  }
}
