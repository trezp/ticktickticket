Students = new Mongo.Collection('students')
Thanks = new Mongo.Collection('thanks')

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault("counter", 0);

  // Template.thanks.helpers({
  //   counter: function () {
  //     return Session.get("counter");
  //   }
  // });
  Template.thanks.helpers({
    //BROKEN. RESET THE DATABASE AND CREATE A PROPER ENTRY. THEN FIGURE OUT
       //HOW TO ACCESS AND DISPLAY PROPERLY. 
    'counter': function(){
       var thanks = Thanks.find().fetch();
       console.log(thanks);
       return thanks.count();
    }
    
  });

  Template.waiting.helpers({
    //helpers refer to {{handlebar}} keywords in the html
    //return students from the database
    'waiting' : function (){
      return Students.find()
},
    'selectedClass': function(){
        //stores the unique id from the click event
        //has access to this._id because it's being excuted
        //inside the {{each}} block
        var studentId = this._id;
        //referring to the studentClicked Session in click event
        var studentClicked = Session.get('studentClicked');
        //if they matched, the .selected class is triggered and the
        //list item is highlighted 
        if(studentId == studentClicked){
          return "selected"
        }
      },
    'currentlyWaiting': function(){
      //if the ul with this id has any list items, a message will be displayed.
      //DOES NOT CURRENTLY WORK
        if( $('#waitingStudents').has('li').text){
          return "CURRENTLY WAITING FOR HELP:"
        }
      }
      
  });

  Template.thanks.events({
    'click button': function () {
      //updates the "count" value of the Thanks collection in the database
      //when button is clicked. Currently updates just fine but does not display
      var countId = Thanks.update({_id: "R2Fe2kquvNWkknnpM"}, {$inc: {count : 1}});
      Session.set('increment', countId);
      var increment = Session.get('increment');
  
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
        Session.set('studentClicked', studentInfo)
        //set the retrieved info to a variable
        var studentClicked = Session.get('studentClicked');
      
      },
       'click .remove' : function(event){
      var studentClicked = Session.get('studentClicked');
      Students.remove(studentClicked)
    }
  });

  Template.ticket.events({
    'submit form' : function(event){
      //using the a method from the event objects to prevent page from
      //refreshing when page is submitted
      event.preventDefault();
      var studentname = event.target.studentname.value;
      var issue = event.target.issue.value;
      console.log(issue)
      Students.insert({
        name: studentname,
        issue: issue
      }); 
      event.target.studentname.value = "";
      event.target.issue.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


