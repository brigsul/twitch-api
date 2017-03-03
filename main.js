// API Base URL for Channels
var chaURL = "https://wind-bow.gomix.me/twitch-api/channels/";
var strURL = "https://wind-bow.gomix.me/twitch-api/streams/"
// List of Streamers
var streamers = ["", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var userObjects = [];
var resObjects = [];
var online = [];
var offline = [];

// Create Streamer Objects
function createUserObjects(array) {
  for (var i = 0; i < array.length; i++) {
    userObjects[i] = {
      name: array[i],
      streamURL: strURL + array[i] + "?=data",
    };
  }
  return userObjects;
}

function statusAssign(data) {
  var on = [];
  var off = [];
  if (data.status == "online") {
    on.push(data.name);
    return on;
  }
  else {
    off.push(data.name);
    return off;
  }
}
createUserObjects(streamers);
//console.log(userObjects);

// Cache Response
function parseStream(data) {
  var res = [];
  var link = data._links.self;
  if (data.stream) {
    var obj = {
      name: data.stream.channel.name, 
      strRes: data,
      status: "online"
    };
    online.push(obj.name);
  }
  else {
    var obj = {
      name: link.slice(37),
      strRes: data,
      status: "offline"
    }
    offline.push(obj.name);
  }
  //console.log(name);
  res.push(obj);
  resObjects = res;
  //console.log(resObjects);
  statusAssign(resObjects);
  makeList(resObjects);
  
}


// Update DOM with New li/div
function makeList(data) {
  var listItem = document.createElement('li');
  if (data[0].strRes.stream == null) {
    listItem.innerHTML = "<a href='https://twitch.tv/"+data[0].name+"'>"+"<div class='list offline'>"+data[0].name+" - Offline</div></a>";
  }
  else {
    listItem.innerHTML = "<a href='https://twitch.tv/"+data[0].name+"'>"+"<div class='list online'><img src='"+data[0].strRes.stream.channel.logo+"'/>"+data[0].strRes.stream.channel.display_name+" - "+data[0].strRes.stream.channel.status+"</div></a>";
  }
  document.getElementById('list').appendChild(listItem);
}

// Change CSS based on Status
// Tabs

// Declare JSON Function
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
}

// API Calls
function streamCall(array) {
  for (var i = array.length-1; i > 0 ; i--) {
    var url = array[i].streamURL;
    getJSON(url, function(err, data) {
      if (err != null) {
        alert('Something went wrong: ' + err);
      } else { 
        //console.log(data);
        resObjects[i] = data;
        parseStream(data);
        }
    });
  }
}


streamCall(userObjects);

//Event Handlers
window.onload = function () {
  document.getElementById("on").addEventListener("click", function(element) {
    var offline = document.getElementsByClassName("offline");
    var online = document.getElementsByClassName("online");
    var hidden = document.getElementsByClassName("hidden");
    for (var i = 0; i < offline.length; i++) {
      offline[i].style.display = "none";
    }
    for (var i = 0; i < online.length; i++) {
      online[i].style.display = "block";
    }
    for (var i = 0; i < offline.length; i++) {
      hidden[i].style.display = "block";
    }
  });

  document.getElementById("all").addEventListener("click", function(element) {
    var offline = document.getElementsByClassName("offline");
    var online = document.getElementsByClassName("online");
    var hidden = document.getElementsByClassName("hidden");
    for (var i = 0; i < offline.length; i++) {
      offline[i].style.display = "block";
    }
    for (var i = 0; i < online.length; i++) {
      online[i].style.display = "block";
    }
    for (var i = 0; i < offline.length; i++) {
      hidden[i].style.display = "block";
    }
  });

  document.getElementById("off").addEventListener("click", function(element) {
    var offline = document.getElementsByClassName("offline");
    var online = document.getElementsByClassName("online");
    var hidden = document.getElementsByClassName("hidden");
    for (var i = 0; i < offline.length; i++) {
      offline[i].style.display = "block";
    }
    for (var i = 0; i < online.length; i++) {
      online[i].style.display = "none";
    }
    for (var i = 0; i < offline.length; i++) {
      hidden[i].style.display = "block";
    }
  });
}

