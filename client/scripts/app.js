
// YOUR CODE HERE:
var message = {
  username: 'steph',
  text: 'curry',
  roomname: 'no clue'
};

var app = {
  
};

app.hi = 'hi';

app.init = function() {
  
}; 

app.send = function(message) {
  
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
};

app.fetch = function() {
  
  var results = [];
  
  $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', function (data) {
    
    
    results.push(data.results);
      // console.log(data.results[0].createdAt);
      // $('#chats').html(user.username + ' ' + user.text);
  });
  
  console.log(results)
  results[0].forEach(function(user) {
    $('#chats').html(user.username + ' ' + user.text);
  });
  // $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  //   type: 'GET',
  //   data: JSON.stringify(message),
  // }); 
  
};

app.renderMessage = function(obj) {
  app.fetch();
  $('#chats').append();
};

app.clearMessages = function() {
  var $chats = $('#chats');
  $chats.children().remove();
};



// $.post('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', message, function (data) {
//   $('#chats').html(JSON.stringify(data));
// });


app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

app.send(message);
app.fetch();