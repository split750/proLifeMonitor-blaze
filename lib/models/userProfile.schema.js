Schema = {};

Schema.UserJob = new SimpleSchema({
    title: {
        type: String,
        optional: true
    },
    company: {
        type: String,
        optional: true
    },
    attachment: {
        type: String,
        optional: true
    },
    summary: {
        type: String,
        optional: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    tel: {
        type: String,
        optional: true
    },
    website: {
        type: String,
        optional: true
    },
    label: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
    city: {
        type: String,
        optional: true
    },
    postalCode: {
        type: String,
        optional: true
    },
    countryRegion: {
        type: String,
        optional: true
    },
    assistant: {
        type: String,
        optional: true
    },
});

Schema.UserSocial = new SimpleSchema({
    linkedIn: {
        type: String,
        optional: true
    },
    twitter: {
        type: String,
        optional: true
    },
});

Schema.UserPicture = new SimpleSchema({
    profile: {
        type: String,
        optional: true
    },
    background: {
        type: String,
        optional: true
    },
    companyLogo: {
        type: String,
        optional: true
    },
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    job: {
        type: Schema.UserJob,
        optional: true
    },
    pictures: {
        type: Schema.UserPicture,
        optional: true
    },
    social: {
        type: Schema.UserSocial,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: { 
        type: [Object], 
        optional: true,
        blackbox: true 
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);