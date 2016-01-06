var UpdateHandler = {
  isNew: function(date) {
    var d = date.split('/');
    var updateDate = new Date(d[2], d[1] - 1, d[0]);

    var oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    var value = updateDate >= oneDayAgo ? "true" : "false";
    return updateDate >= oneDayAgo;
  }
};
