describe('Sidebar', function() {
  describe('toggles sidebar', function() {
    var iframeDocument;
    var sidebar = {
      id: 'sidebar', style: {}, parentNode: { removeChild: function() {} },
      addEventListener: function() {}
    };

    beforeEach(function() {
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
      Sidebar.toggleSidebar();

      expect(sidebar.className).toContain("hidden");
      expect(Sidebar.sidebarOpen).toBe(false);
    });

    it('opens sidebar', function() {
      Sidebar.toggleSidebar();

      expect(sidebar.innerHTML).toContain('Movimentações Recentes');
      expect(Sidebar.sidebarOpen).toBe(true);
    });
  });

  describe('adds updates', function() {
    var iframeDocument;
    var updatesList = {
      innerHTML: "",
      appendChild: function(text) {
        this.innerHTML += text;
      }
    };

    beforeEach(function() {
      iframeDocument = jasmine.createSpyObj('iframe', ['getElementById']);
      iframeDocument.getElementById = function() { return updatesList };

      Sidebar.windowDocument = iframeDocument;
    });

    it('adds update to the list', function() {
      Sidebar.addUpdates('1234', [{ date: '10/10/10', update: 'hi' }]);

      expect(updatesList.innerHTML).toContain('10/10/10: hi');
    });
  });

  describe('adds all updates', function() {
    var iframeDocument;
    var updatesList = {
      innerHTML: "",
      appendChild: function(text) {
        this.innerHTML += text;
      }
    };
    var updatesProcesses = [
      {
        "number": "123457",
        "updates": [{
          "date": "10/10/10",
          "update": "Hi"
        }]
      }
    ];

    beforeEach(function() {
      iframeDocument = jasmine.createSpyObj('iframe', ['getElementById']);
      iframeDocument.getElementById = function() { return updatesList };

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
});
