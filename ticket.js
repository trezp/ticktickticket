Students = new Mongo.Collection('students')

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.thanks.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.waiting.helpers({
    'waiting' : function (){
      return "Treasure"
    },

    'issue' : function() {
      return "My shit is broke!"
    }
  });

  Template.thanks.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
