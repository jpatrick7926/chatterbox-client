$(document).ready(function() {
  var app = {
    person: {},
    rooms: {},
    server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  };
  app.init = function() {
    app.clearMessages();
    app.fetch();
    app.submitButton(); 
    // setInterval(function() {
    //   app.init();
    // }, 20000);   
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
        // app.populateRoomNames(data);
      },
      error: function (error) {
        console.log('this is our error: ', error); 
      }
    });
  };
  app.renderMessage = function(obj) {
    obj.results.forEach(function(person) {
       
      var userName = 'anonymous';
      var textPrompt = 'empty message';

      if (app.rooms[person.roomname] === undefined) {
        app.rooms[person.roomname] = [{username: person.username, text: person.text}];
        $('select').append('<option value=' + person.roomname + '>' + person.roomname + '</option>');
      }

      if (person.username !== undefined) {
        userName = app.convertMessage(person.username);
      }

      if (person.text !== undefined && !person.text.includes('script')) {
        textPrompt = app.convertMessage(person.text);
      }
      if (textPrompt !== 'empty message' && userName !== 'anonymous') {
        app.renderHTML(userName, textPrompt);
      }
    });  
  };

  app.renderHTML = function(input1, input2) {
    $('#chats').append(
      '<div class="well col-md-3">' +     
        '<p>' + input1 + '</p>' +
      '</div>' + 
      
      '<div class="well col-md-9">' +     
        '<p class="left">' + input2 + '</p>' +
      '</div>');
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
  
  $('select').on('change', function() {
    var x = $('.dropDownMenu').find( ':selected' ).text();
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        data.results
          .filter(function(person) { return person.roomname === x; })
          .forEach(function(person) { app.renderHTML(person.username, person.text); });   
      }
    });
  });  
  app.init();
  // setInterval(function() {
  //   app.init();
  // }, 10000);
});