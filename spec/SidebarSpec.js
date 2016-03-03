describe('Sidebar', function() {
  var iframeDocument, updatesList;

  describe('toggles sidebar', function() {
    var sidebar;

    beforeEach(function() {
      sidebar = {
        id: 'sidebar', style: {}, parentNode: { removeChild: function() {} },
        addEventListener: function() {}
      };

      iframeDocument = jasmine.createSpyObj('iframe',
        ['getElementById', 'getElementsByClassName', 'createElement']);
      iframeDocument.getElementById = function() { return sidebar };
      iframeDocument.createElement = function() { return sidebar };
      iframeDocument.body = { appendChild: function() {} };

      Sidebar.windowDocument = iframeDocument;
    });

    it('creates sidebar', function() {
      Sidebar.setUp();

      expect(sidebar.innerHTML).toContain('Movimentações Recentes');
      expect(Sidebar.sidebarOpen).toBe(true);
    });

    it('closes sidebar', function() {
      Sidebar.setUp();
      Sidebar.toggleSidebar();

      expect(sidebar.className).toContain("hidden");
      expect(Sidebar.sidebarOpen).toBe(false);
    });

    it('opens sidebar', function() {
      Sidebar.setUp();
      Sidebar.toggleSidebar();
      Sidebar.toggleSidebar();

      expect(sidebar.innerHTML).toContain('Movimentações Recentes');
      expect(Sidebar.sidebarOpen).toBe(true);
    });
  });

  describe('adds updates', function() {
    beforeEach(function() {
      updatesList = {
        innerHTML: "",
        appendChild: function(text) {
          this.innerHTML += text;
        }
      };

      iframeDocument = jasmine.createSpyObj('iframe', ['getElementById']);
      iframeDocument.getElementById = function() { return updatesList };

      Sidebar.windowDocument = iframeDocument;
    });

    it('adds regular update to the list', function() {
      Sidebar.addUpdates('1234', [{ date: '10/10/10', update: 'hi' }]);

      expect(updatesList.innerHTML).toContain('10/10/10: Hi');
      expect(updatesList.innerHTML).not.toContain('last-update');
    });

    it('adds last update to the list', function() {
      Sidebar.addUpdates('1234', [{ date: '10/10/10', update: 'hi' }], true);

      expect(updatesList.innerHTML).toContain('10/10/10: Hi');
      expect(updatesList.innerHTML).toContain('last-update');
    });
  });

  describe('adds all updates', function() {
    var updatesProcesses;

    beforeEach(function() {
      updatesList = {
        innerHTML: "",
        appendChild: function(text) {
          this.innerHTML += text;
        }
      };
      updatesProcesses = [
        {
          "number": "123457",
          "updates": [{
            "date": "10/10/10",
            "update": "Hi"
          }]
        }
      ];

      iframeDocument = jasmine.createSpyObj('iframe', ['getElementById']);
      iframeDocument.getElementById = function(id) {
        if (id == 'updates-list') return updatesList;
      };

      Sidebar.windowDocument = iframeDocument;
    });

    it('does not fail when no processes', function() {
      Sidebar._addUpdatedProcesses();

      expect(updatesList.innerHTML).toEqual('');
    });

    it('adds all updates to the list', function() {
      Sidebar._addUpdatedProcesses(updatesProcesses);

      expect(updatesList.innerHTML).toContain('10/10/10: Hi');
    });
  });

  describe('clearUpdates', function () {
    beforeEach(function() {
      updatesList = {
        innerHTML: "<li>info</li>",
      };
      iframeDocument = jasmine.createSpyObj('iframe', ['getElementById']);
      iframeDocument.getElementById = function(id) {
        if (id == 'updates-list') return updatesList;
      };

      Sidebar.windowDocument = iframeDocument;
    });

    it('removes all updates', function () {
      Sidebar.clearUpdates();

      expect(updatesList.innerHTML).toBe('');
    });
  });
});
