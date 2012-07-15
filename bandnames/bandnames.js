BandNames = new Meteor.Collection("bandnames");

if (Meteor.is_client) {
  Template.names.greeting = function () {
    return "Yet another silly thing on the internet.";
  };

  Template.bandnames = function () {
      return BandNames.find();
  };

  Template.submitname.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined'){
        console.log("You pressed the button");
        BandNames.insert({'text': new_bandname, 'author': new_author });
      }
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function(){
    var names = [];
    if (BandNames.find().count() === 0) {
      names = [
        {text: 'DangleSkank',   author: 'Joel'},
        {text: 'WrathPony',     author: 'Joel'},
        {text: 'HMS Groovytron',author: 'Cody'},
        {text: 'wubwub',        author: 'Sol', times_suggested: 2}
      ];
    }
    for (var i = 0; i < names.length; i++){
      BandNames.insert(names[i],function(){
        console.log('added initial names array');
      });
    }
  });
}
