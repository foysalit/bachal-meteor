var Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  var scrollChatToBottom = function () {
    setTimeout(function () {
      var $threadList = $('.chat-thread');

      $threadList.animate({ 
        scrollTop: $threadList[0].scrollHeight 
      }, 100);
    }, 100);
  };

  Template.input.events = {
    'keydown input#message_input_field' : function (event) {
      if (event.which == 13) { // 13 is the enter key event
        if (Meteor.user()) {
          var name = Meteor.user().emails[0].address;
        } else {
          var name = 'Anonymous';
        }

        var $message = $(event.currentTarget);
         
        if ($message.val().trim().length > 0) {
          Messages.insert({
            name: name,
            message: $message.val(),
            time: Date.now(),
          });
           
          $message.val("");
          scrollChatToBottom();
        }
      }
    }
  };

  Template.messages.helpers({
    messages: function() {
      scrollChatToBottom();
      return Messages.find({}, { sort: { time: -1}});
    }
  }); 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
