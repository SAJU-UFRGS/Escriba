describe('Sidebar', function() {
  describe('toggles sidebar', function() {
    var iframeDocument;
    var sidebar = {
      id: 'sidebar', style: {}, parentNode: { removeChild: function() {} }
    };

    beforeEach(function() {
      iframeDocument = jasmine.createSpyObj('iframe',
        ['getElementById', 'getElementsByClassName', 'createElement']);
      iframeDocument.getElementById = function() { return sidebar };
      iframeDocument.createElement = function() { return sidebar };
      iframeDocument.body = { appendChild: function() {} };

      Sidebar.windowDocument = iframeDocument;
    });

    it('opens sidebar', function() {
      Sidebar.toggleSidebar();

      expect(sidebar.innerHTML).toContain('Movimentações Recentes');
      expect(Sidebar.sidebarOpen).toEqual(true);
    });

    it('closes sidebar', function() {
      Sidebar.toggleSidebar();

      expect(Sidebar.sidebarOpen).toEqual(false);
    });
  });
});
