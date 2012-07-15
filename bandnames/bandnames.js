BandNames = new Meteor.Collection("bandnames");

if (Meteor.is_client) {

  Meteor.autosubscribe(function () {
    Meteor.subscribe("bandnames");
  });

  Template.bandnames.bandnames = function () {
      return BandNames.find();
  };

  Template.submitname.events = {
    'click input[type="button"]' : function () {
      if (typeof console !== 'undefined'){
        console.log("You pressed the button");
      }
      var text = $('[name="new_bandname"]').val();
      var author = $('[name="new_author"]').val();
      var new_bandname = {'text': text, 'author': author };
      console.log('adding new bandname:');
      console.log(new_bandname);
      BandNames.insert(new_bandname);
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
        console.log('Added '+names[i].toString()+' to collection.');
      });
    }
  });
}
