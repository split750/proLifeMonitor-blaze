Meteor.subscribe("userData");

Template.profileEdit.events({
  'submit form': function(event){
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