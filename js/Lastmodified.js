var getMTime = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, true); // use HEAD - we only need the headers
  
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader('Access-Control-Allow-Methods', 'HEAD');
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var mtime = new Date(xhr.getResponseHeader('Last-Modified'));
      var mtime = moment(mtime).startOf('hour').fromNow();
      if (mtime.toString() === 'Invalid Date') {
        callback(); // dont want to return a bad date
      } else {
        callback(mtime);
      }
    }
  }
  xhr.send();
};

getMTime('http://extensivepro.com:8080/app/pos.ipa', function(mtime) {
  if (mtime) console.log('last updated on:' + mtime);
  
  

  var timeOuter = document.getElementById('timeOuter');
  timeOuter.innerHTML = "Last updated : " + mtime;
});

getMTime('http://192.168.0.103:8080/job/ExproPosCocoaPods/ws/build/pos.ipa', function(mtime) {
  if (mtime) console.log('last updated on:' + mtime);
  
  

  var timeInner = document.getElementById('timeInner');
  timeInner.innerHTML = "Last updated : " + mtime;
});

