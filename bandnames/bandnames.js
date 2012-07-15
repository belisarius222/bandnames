BandNames = new Meteor.Collection("bandnames");

if (Meteor.is_client) {

  Meteor.autosubscribe(function () {
    Meteor.subscribe("bandnames");
  });

  Template.bandnames = function () {
    console.log('running Template.bandnames');
    return BandNames.find();
  };

  Template.submitname.events = {
    'click input[type="button"]' : function () {
      var text = $('[name="new_bandname"]').val();
      var author = $('[name="new_author"]').val();
      var new_bandname = {'text': text, 'author': author };
      console.log('adding new bandname:');
      console.log(new_bandname);
      BandNames.insert(new_bandname,function(){
        console.log('inserted new bandname');
      });
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
        {text: 'wubwub',        author: 'Sol'}
      ];
    }
    for (var i = 0; i < names.length; i++){
      BandNames.insert(names[i],function(){
        console.log('Added '+names[i].toString()+' to collection.');
      });
    }
  });
}
