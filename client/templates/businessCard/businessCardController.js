Meteor.subscribe("userData");

Template.profileEdit.events({

  'change input#profilePicFile': function(event){
    event.preventDefault();

    Session.set('imageIsSubmitting', 'uploading...');

    var files = [];
    var file = $('#profilePicFile')[0].files[0];
    files.push(file);
    console.log(files);
    Cloudinary._upload_file(file, {}, function(err, res) {
      if(err) {
        console.log("Upload Error: "+err);
      } else {
        console.log(res.public_id);
        var publicIdVar = res.public_id;
        
        // delete old photo
        var profilPicPublicIdVar = Meteor.user().profile.pictures.profile;
        console.log(profilPicPublicIdVar);

        Cloudinary.delete(profilPicPublicIdVar, function(err, res) {
          if(err) {
            console.log("can't delete old picture: "+err);
          } else {
            console.log("successfully delete old picture");
          }
        });
        
        //Set new link
        Session.set('profilPicPublicId', publicIdVar);
        Session.set('imageIsSubmitting', 'uploaded'); 
      }
    });
  },

  'change input#backgroundPicFile': function(event){
    event.preventDefault();

    Session.set('imageIsSubmitting', 'uploading...');

    var files = [];
    var file = $('#backgroundPicFile')[0].files[0];
    files.push(file);
    console.log(files);
    Cloudinary._upload_file(file, {}, function(err, res) {
      if(err) {
        console.log("Upload Error: "+err);
      } else {
        console.log(res.public_id);
        var publicIdVar = res.public_id;
        
        // delete old photo
        var backgroundPicPublicIdVar = Meteor.user().profile.pictures.background;
        Cloudinary.delete(backgroundPicPublicIdVar, function(err, res) {
          if(err) {
            console.log("can't delete old picture: "+err);
          } else {
            console.log("successfully delete old picture");
          }
        });

        //Set new link
        Session.set('backgroundPicPublicId', publicIdVar);
        Session.set('imageIsSubmitting', 'uploaded');
      }
    }); 
  },

  'change input#companyPicFile': function(event){
    event.preventDefault();

    Session.set('imageIsSubmitting', 'uploading...');

    var files = [];
    var file = $('#companyPicFile')[0].files[0];
    files.push(file);
    console.log(files);
    Cloudinary._upload_file(file, {}, function(err, res) {
      if(err) {
        console.log("Upload Error: "+err);
      } else {
        console.log(res.public_id);
        var publicIdVar = res.public_id;
        
        // delete old photo
        var companyLogoPublicIdVar = Meteor.user().profile.pictures.companyLogo;
        Cloudinary.delete(companyLogoPublicIdVar, function(err, res) {
          if(err) {
            console.log("can't delete old picture: "+err);
          } else {
            console.log("successfully delete old picture");
          }
        });

        //Set new link
        Session.set('companyLogoPublicId', publicIdVar);
        Session.set('imageIsSubmitting', 'uploaded');
      }
    });
  },

  'submit form#cardInfo': function(event){
    event.preventDefault();

    Session.set('isSubmitting', 'submitting ...');

    var firstNameVar = event.target.firstName.value;
    var lastNameVar = event.target.lastName.value;
    var companyVar = event.target.company.value;
    var titleVar = event.target.title.value;
    var attachmentVar = event.target.attachment.value;
    var summaryVar = event.target.summary.value;
    var emailVar = event.target.email.value;
    var telVar = event.target.tel.value;
    var websiteVar = event.target.website.value;
    var labelVar = event.target.label.value;
    var addressVar = event.target.address.value;
    var cityVar = event.target.city.value;
    var postalCodeVar = event.target.postalCode.value;
    var countryRegionVar = event.target.countryRegion.value;
    var assistantVar = event.target.assistant.value;
    var twitterVar = event.target.twitter.value;
    var linkedInVar = event.target.linkedIn.value;
    var profilePicVar = event.target.profilPic.value;
    var backgroundPicVar = event.target.backgroundPic.value;
    var companyLogoVar = event.target.companyLogo.value;

    Meteor.users.update(Meteor.userId(), {$set: { 
      profile: {
        firstName: firstNameVar,
        lastName: lastNameVar,
        job : {
          company: companyVar,
          title: titleVar,
          attachment: attachmentVar,
          summary: summaryVar,
          email: emailVar,
          tel: telVar,
          website: websiteVar,
          label: labelVar,
          address: addressVar,
          city: cityVar,
          postalCode: postalCodeVar,
          countryRegion: countryRegionVar,
          assistant: assistantVar,
        },
        social :{
          twitter: twitterVar,
          linkedIn: linkedInVar
        },
        pictures: {
          profile: profilePicVar,
          background: backgroundPicVar,
          companyLogo: companyLogoVar
        }
      }
    }}, function(err) {
      if(err) {
        Session.set('errorMessage', err.message);
      } else {
        Session.set('isSubmitting', 'submitting ...');
        Session.set('errorMessage', 'success !');
        Router.go('profileView');
      }
    });
  }
});

Template.profileEdit.helpers({
  userData: function() {
    return Meteor.user();
  },
  errorMessage: function() {
    return Session.get('errorMessage');
  },
  imageIsSubmitting: function() {
    return Session.get('imageIsSubmitting');
  },
  profilPicPublicId: function() {
    return Session.get('profilPicPublicId');
  },
  backgroundPicPublicId: function() {
    return Session.get('backgroundPicPublicId');
  },
  companyLogoPublicId: function() {
    return Session.get('companyLogoPublicId');
  }
});


Template.profileView.helpers({
  userData: function() {
    return Meteor.user();
  },
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});