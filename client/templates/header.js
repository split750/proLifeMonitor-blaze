Template.header.events({
	"click .logout": function (event) {
	  // Prevent default browser form submit
	  event.preventDefault();

	  Meteor.logout();

	  Router.go('home');
	}

});


Template.header.helpers({
	loggedIn: function () {
	    if (Meteor.user() === null) {
	        return 'hidden';
	    } else {
	        return 'visible';
	    }
    },
    loggedOut: function () {
	    if (Meteor.user() === null) {
	        return 'visible';
	    } else {
	        return 'hidden';
	    }
    }
});