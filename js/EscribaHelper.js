var EscribaHelper = {
  processPattern: /num_processo_mask=(\d+)/,

  _findNumberFromURIAndUpdateProcess: function(uri) {
    var processNumber;

    processNumber = this.processPattern.exec(uri)[1];
    if (processNumber) {
      ProcessStore.markAsViewed(processNumber);
    }
  },

  _isErrorPage: function(pageText) {
    return pageText && pageText.innerText.indexOf('INVÁLIDO') > -1;
  },

  _setValueAndFocusOnCaptcha: function(input, iframeDocument) {
    ProcessStore.getNextProcess(function(nextProcess) {
      if (nextProcess) {
        input.setAttribute('value', nextProcess);
        iframeDocument.getElementById('code').focus();
      }
    });
  },

  _retrieveLastUpdates: function(table) {
    var updates = Array.prototype.map.call(table.rows, function(row) {
      return {
        date: row.querySelector('td:nth-of-type(2)').innerText.trim(),
        update: row.querySelector('td:nth-of-type(3)').innerText.trim()
      }
    });
    var newUpdates = updates.filter(function(update) {
      return UpdateHandler.isNew(update.date);
    });
    console.log(newUpdates);
  },

  updateProcessForPage: function(iframeDocument) {
    var processInput, processError, processInfo, processURI, updatesTable;

    processInput = iframeDocument.getElementById('num_processo_mask');
    processInfo = iframeDocument.getElementById('conteudo');
    processError = iframeDocument.getElementsByClassName('fonte_grande')[1];

    if (processInput) {
      this._setValueAndFocusOnCaptcha(processInput, iframeDocument);
    } else if (processInfo) {
      processURI = processInfo.getElementsByTagName('table')[0].firstChild.baseURI;
      this._findNumberFromURIAndUpdateProcess(processURI);
      updatesTable = processInfo.querySelector('table:last-of-type');
      this._retrieveLastUpdates(updatesTable);
    } else if (this._isErrorPage(processError)) {
      processURI = processError.baseURI;
      this._findNumberFromURIAndUpdateProcess(processURI);
    }
  }
};
