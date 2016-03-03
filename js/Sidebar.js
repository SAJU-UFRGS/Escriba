var Sidebar = {
  windowDocument: {},
  sidebarOpen: false,

  setUp: function() {
    this._createSidebar();
    this._setUpToggleButton();
    this._slideContent();
  },

  toggleSidebar: function() {
    var el = this.windowDocument.getElementById('sidebar-content');

    if (this.sidebarOpen) {
      el.className += " hidden";
      this.sidebarOpen = false;
    } else {
      el.className = el.className.replace(" hidden", "");
      this.sidebarOpen = true;
    }

    this._slideContent();
    this._slideButton();
  },

  addUpdates: function(processNumber, processUpdates, isNew) {
    var el = this.windowDocument.getElementById('updates-list');

    var lastUpdateHeading = isNew ? "last-update-heading" : "";
    var lastUpdate = isNew ? "last-update" : "";

    el.innerHTML += "<h4 class=\"update-heading " + lastUpdateHeading + "\">" +
      "Processo " + processNumber + "</h4>";

    processUpdates.forEach(function(update) {
      el.innerHTML += "<li class=\"update-content " + lastUpdate + "\">" +
        update.date + ": " + Sidebar._capitalizeFirstLetter(update.update) +
        "</li>";
    });
  },

  clearUpdates: function () {
    var el = this.windowDocument.getElementById('updates-list');
    el.innerHTML = "";
  },

  rerenderAllUpdates: function () {
    this.clearUpdates();
    this._addAllUpdates();
  },

  _capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },

  _createSidebar: function() {
    var sidebar = this.windowDocument.createElement('div');
    sidebar.id = "sidebar";
    sidebar.className = "pure-menu custom-restricted-width";
    sidebar.innerHTML = "\
      <div id=\"sidebar-content\">\
        <span id=\"sidebar-title\" class=\"pure-menu-heading\">Movimentações Recentes</span>\
        <ul id=\"updates-list\">\
        </ul>\
      </div>\
      <span id=\"toggle-button\" class=\"pure-button\">+</span>\
      ";
    this.windowDocument.body.appendChild(sidebar);
    this.sidebarOpen = true;
  },

  _setUpToggleButton: function() {
    var button = this.windowDocument.getElementById('toggle-button');
    button.addEventListener('click', function() {
      Sidebar.toggleSidebar();
    });
  },

  _slideContent: function() {
    var leftMargin = this.sidebarOpen ? "22%" : "auto";
    var content = this.windowDocument.getElementById('conteudo');
    content.style.marginLeft = leftMargin;
  },

  _slideButton: function() {
    var leftMargin = this.sidebarOpen ? "18%" : "0%";
    var button = this.windowDocument.getElementById('toggle-button');
    button.style.left = leftMargin;
  },

  _addAllUpdates: function() {
    ProcessStore.getUpdatedProcesses(this._addUpdatedProcesses);
  },

  _addUpdatedProcesses: function(processes) {
    if (processes !== undefined) {
      processes.forEach(function(process) {
          Sidebar.addUpdates(process.number, process.updates);
      });
    }
  }
}
