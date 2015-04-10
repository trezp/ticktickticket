Students = new Mongo.Collection('students');
Problems = new Mongo.Collection('problems');
Thanks = new Mongo.Collection('thanks');


if (Meteor.isClient) {
  //returns the number of thanks yous from the database 
  Template.thanks.helpers({
    counter : function(){
      return Thanks.findOne().thanks
    }
  });


  Template.waiting.helpers({
    //helpers refer to {{handlebar}} keywords in the html
    //return students from the database
    'waiting' : function (){
      return Students.find();
  }      
});

  Template.problemLog.helpers({
    problem : function(){
      return Problems.find()
    }
  });


  Template.thanks.events({
    'click .increment': function () {
      var thanksKevin = Thanks.findOne();
      Thanks.update(thanksKevin._id, {$inc: {thanks : 1}});
    }
  });

  Template.waiting.events({
      'click .students' : function() {
        //this function gets the unique database ID of a student
        //and stores it in a session for use in the selectedClass helper. 
        //get the unique ID of the database entry
        var studentInfo = this._id;
        //the first argument is the name of the session
        //the second argument is the info passed into the session
        Session.set('studentClicked', studentInfo);
        //set the retrieved info to a variable
        var studentClicked = Session.get('studentClicked');
      
      },
       'click .remove': function(event){
          var studentClicked = Session.get('studentClicked');
          Students.remove(studentClicked);
    },

      'click .fa-times-circle': function(event){
          var studentClicked = Session.get('studentClicked');
          Students.remove(studentClicked);
    }
  });

   
  Template.ticket.events({
    'submit form' : function(event){
      //using the a method from the event objects to prevent page from
      //refreshing when page is submitted
      event.preventDefault();
      var studentname = event.target.studentname.value;
      var issue = event.target.issue.value;

      Problems.insert({
        name: studentname,
        issue : issue
      });

      Students.insert({
        name: studentname,
        issue: issue
      }); 


      event.target.studentname.value = "";
      event.target.issue.value = "";
      $("#modalForm").modal('hide');
    }, 

    'click #getInLine' : function(){
        $('#modalForm').on('shown.bs.modal', function () {
        $('#studentname').focus()
            });

    },

    'click #closeModal' : function(){
      $("#modalForm").modal('hide');
    }

  

  });

  Template.layout.events({
    'click .waitListMode' : function(event, template){
      event.preventDefault();
      Router.go('/waitlist');
    },

    'click .issueLog' : function(event, template){
      event.preventDefault();
      Router.go('/log');
    }


  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


