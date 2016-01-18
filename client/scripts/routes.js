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


Router.route('/profile/csv', { where: 'server' })
  .get(function () {
    // GET /webhooks/stripe
    var userData = Meteor.user();
    console.log(userData);
    var date = new Date();
    
    var csv = Papa.unparse({
      fields: ["BEGIN", "VCARD"],
      data: [
        ["VERSION", "3.0"],
        ["FN;CHARSET=UTF-8", userData.profile.firstName + ' ' + userData.profile.lastName],
        ["N;CHARSET=UTF-8", userData.profile.lastName + ';' + userData.profile.firstName + ';;;'],
        ["EMAIL;CHARSET=UTF-8;type=WORK,INTERNET", userData.profile.job.email],
        ["TEL;TYPE=WORK,VOICE", userData.profile.job.tel],
        ["LABEL;CHARSET=UTF-8;TYPE=WORK", "Work Address"],
        ["ADR;CHARSET=UTF-8;TYPE=WORK", ';;' + userData.profile.job.address + ';' + userData.profile.job.city +';;' + userData.profile.job.postalCode + ';' + userData.profile.job.countryRegion],
        ["TITLE;CHARSET=UTF-8:", userData.profile.job.title],
        ["ORG;CHARSET=UTF-8", userData.profile.job.company],
        ["URL;CHARSET=UTF-8", userData.profile.job.website],
        ["X-SOCIALPROFILE;CHARSET=UTF-8;TYPE=twitter", userData.profile.social.twitter],
        ["REV", date],
        ["END", "VCARD"]
      ]
    }, {
      quotes: false,
      delimiter: ":",
      newline: "\r\n"
    });
    
    console.log(csv);
    
    var csvFile = new Blob(csv, {type: "text/vcard;charset=utf-8"});
	saveAs(blob, userData.profile.firstName + ' ' + userData.profile.lastName + '.vcf');
 
  })
