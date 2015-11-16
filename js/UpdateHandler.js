var UpdateHandler = {
  isNew: function(date) {
    var d = date.split('/');
    var updateDate = new Date(d[2], d[1] - 1, d[0]);

    var threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return updateDate >= threeDaysAgo;
  }
};
