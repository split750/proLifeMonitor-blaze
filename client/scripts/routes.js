Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/register', {
	onBeforeAction: function () {
		Session.set('errorMessage', null);
		this.next();
	},
	action: function () {
	  this.render('header', {to: 'header'});
	  this.render('footer', {to: 'footer'});
	  
	  this.render('register');
	}
});

Router.route('/login', {
	onBeforeAction: function () {
		Session.set('errorMessage', null);
		this.next();
	},

	action: function () {
	  this.render('header', {to: 'header'});
	  this.render('footer', {to: 'footer'});
	  
	  this.render('login');
	}
});

Router.route('/', {
	name: 'home',
	action : function () {

	  this.render('header', {to: 'header'});
	  this.render('footer', {to: 'footer'});
	  
	  this.render('home');
	}
});

Router.route('/profile/edit', {
	name: 'profileEdit',
	onBeforeAction: function () {
		Session.set('errorMessage', null);
		Session.set('isSubmitting', 'submit');
		Session.set('imageIsSubmitting', 'upload');
		Session.set('profilPicPublicId', null);
		Session.set('backgroundPicPublicId', null);
		Session.set('companyLogoPublicId', null);
		this.next();
	},
	action : function () {

	  this.render('header', {to: 'header'});
	  this.render('footer', {to: 'footer'});
	  
	  this.render('profileEdit');
	}
});

Router.route('/profile/view', {
	name: 'profileView',
	onBeforeAction: function () {
		Session.set('errorMessage', null);
		Session.set('isSubmitting', 'submit');
		this.next();
	},
	action : function () {

	  this.render('header', {to: 'header'});
	  this.render('footer', {to: 'footer'});
	  
	  this.render('profileView');
	}
});

Router.route('/todo', function () {
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
  
  this.render('taskList');
});
