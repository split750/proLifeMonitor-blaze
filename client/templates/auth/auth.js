Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;

        Accounts.createUser({
		    email: emailVar,
    		password: passwordVar
		}, function(err) {
			if(err) {
				Session.set('errorMessage', err.message);
			} else {
				Session.set('errorMessage', 'success !');
				console.log(err);
				Router.go('home');
			}
		});
    }
});

Template.register.helpers({
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        
        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
        	if(err) {
				Session.set('errorMessage', err.message);
			} else {
				Session.set('errorMessage', 'success !');
				console.log(err);
				Router.go('home');
			}
        });
        
    }
});

Template.login.helpers({
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});