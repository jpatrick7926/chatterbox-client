$(document).ready(function() {
  var app = {
    person : {},
    server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  };
  app.init = function() {
    app.clearMessages();
    app.fetch();
    app.submitButton(); 
    // setInterval(function() {
    //   app.init();
    // }, 12000);   
  }; 
  app.send = function(message) {
    
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
    
  };
  app.fetch = function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.renderMessage(data);
        app.renderRoomName(data);
        app.populateRoomNames(data);
      }
    });
  };
  app.renderMessage = function(obj) {
    obj.results.forEach(function(person) {

      app.person.roomname = person.roomname; 
      
      var userName = 'anonymous';
      var textPrompt = 'empty message';
      if (person.username !== undefined) {
        userName = app.convertMessage(person.username);
      }

      if (person.text !== undefined && !person.text.includes('script')) {
        textPrompt = app.convertMessage(person.text);
      }
      if (textPrompt !== 'empty message' && userName !== 'anonymous') {
    // if (!userName.includes('<script>') || !textPrompt.includes('</script>')) {
      $('#chats').append(
    //   //first section that covers username
      '<div class="well col-md-3">' +     
        '<p>' + userName + '</p>' +
      '</div>' + 
      // second area that covers text of current username
      '<div class="well col-md-9">' +     
        '<p class="left">' + textPrompt + '</p>' +
      '</div>');
      }
    });  
  };

  app.populateRoomNames = function(obj) {
    var users = obj.results;
    var rooms = {};
    users.forEach(function(person) {
      if (person.roomname === undefined) {
        person.roomname = 'lobby';
      }
      var roomName = person.roomname;
      if (rooms[roomName] === undefined) {
        rooms[roomName] = [{username: person.username, text: person.text}];
        $('select').append('<option value=' + person.roomname + '>' + person.roomname + '</option>');
      } else {
        rooms[roomName].push({username: person.username, text: person.text});
      }
    });
    console.log(rooms);
  };

  app.renderRoomName = function(obj) {
    return filteredRooms = obj.results.filter(function(user) {
      if (user.roomname === 'lobby') {
        
      }
    });
    console.log(filteredRooms);
  };
    
  app.convertMessage = function(message) {
    return message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');
  };

  app.clearMessages = function() {
    var $chats = $('#chats');
    $chats.children().remove();
  };

  app.submitButton = function() {
    $('#submitButton').on('click', function() {
      app.person.username = window.location.search.slice(10);
      app.person.text = $('#searchField').val();
      app.person.roomname = 'Oracle Arena';
      // app.person.createdAt = 
      app.send(app.person);
    });
  };

  app.init();

  // setInterval(function() {
  //   app.init();
  // }, 10000);

  
});