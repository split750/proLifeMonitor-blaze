Template.home.helpers({
  usersCount: function() {
    return Meteor.users.find().count();
  }
});

