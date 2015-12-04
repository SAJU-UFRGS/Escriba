var EscribaHelper = {
  processPattern: /num_processo_mask=(\d+)/,
  iframeDocument: {},

  _isErrorPage: function(pageText) {
    return pageText && pageText.innerText.indexOf('INVÁLIDO') > -1;
  },

  _setValueAndFocusOnCaptcha: function(input) {
    ProcessStore.getNextProcess(function(nextProcess) {
      if (nextProcess) {
        input.setAttribute('value', nextProcess.number);
        EscribaHelper.iframeDocument.getElementById('code').focus();
      }
    });
  },

  _retrieveInfoFromPage: function (options) {
    var processInfo = options.processInfo;
    var shouldCollectUpdates = options.shouldCollectUpdates;

    var number = this.processPattern.exec(options.uri)[1];
    var processUpdates = null;
    if (number && shouldCollectUpdates) {
      processUpdates = this._retrieveLastUpdates(processInfo);
    }
    ProcessStore.updateProcess(number, {isViewed: true, updates: processUpdates});
  },

  _retrieveLastUpdates: function(processInfo) {
    var table = processInfo.querySelector('table:last-of-type');
    var updates = Array.prototype.map.call(table.rows, function(row) {
      return {
        date: row.querySelector('td:nth-of-type(2)').innerText.trim(),
        update: row.querySelector('td:nth-of-type(3)').innerText.trim()
      }
    });
    return newUpdates = updates.filter(function(update) {
      return UpdateHandler.isNew(update.date);
    });
  },

  updateProcessForPage: function() {
    var processInput, processError, processInfo, updatesTable, processURI;

    processInput = this.iframeDocument.getElementById('num_processo_mask');
    processInfo = this.iframeDocument.getElementById('conteudo');
    processError = this.iframeDocument.getElementsByClassName('fonte_grande')[1];

    if (processInput) {
      this._setValueAndFocusOnCaptcha(processInput);
    } else if (processInfo) {
      processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
      this._retrieveInfoFromPage({uri: processURI, processInfo: processInfo, shouldCollectUpdates: true});
    } else if (this._isErrorPage(processError)) {
      this._retrieveInfoFromPage({uri: processError.baseURI, shouldCollectUpdates: false});
    }
  }
};
