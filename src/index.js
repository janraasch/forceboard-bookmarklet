(function () {
  var log = function (text) {
    var prefix = 'forceboard: ';
    console.log(prefix + text); // eslint-disable-line no-console
  };

  var initStyles = function () {
    var sheet = document.createElement('style')
    sheet.innerHTML = '.bPageTitle { display: none; } .bPageHeader { display: none }';
    document.body.appendChild(sheet);
    return true;
  };

  var autoRefresh = function () {
    var seconds = new Date().getSeconds();
    var time = /(..)(:..)/.exec(new Date()); // The prettyprinted time.
    var hour = time[1] % 12 || 12; // The prettyprinted hour.
    var period = ':' + seconds + ' ' + (time[1] < 12 ? 'AM' : 'PM'); // The period of the day.

    if (document.getElementById('refreshButton')) {
      log('At ' + hour + time[2] + period + ' : refreshButton found, clicking ...');
      document.getElementById('refreshButton').click();
    } else {
      log('Unable to locate Refresh Button.');
    }
  };

  var initInterval = function (interval) {
    window.forceboardInterval = setInterval(autoRefresh, interval);
    log('Started interval with ' + interval + 'seconds');
  };

  if (!initStyles()) {
    log('Unable to init Styles.')
  }

   initInterval(10000);
}())
